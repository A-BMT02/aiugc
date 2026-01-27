import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img } from 'remotion';

const editedImageUrl = 'https://tempfile.aiquickdraw.com/workers/nano/image_1769180184320_4rab64.png';

// Scene 5: Script Input with Typing
export const ScriptInputScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const text = "Hey there! Check out this amazing product if you want to be really smart...";
  const typedLength = Math.floor(interpolate(frame, [0, fps * 2], [0, text.length], { extrapolateRight: 'clamp' }));
  const showCursor = Math.floor(frame / 15) % 2 === 0;

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000' }}>
      <div style={{ display: 'flex', height: '100%', color: 'white' }}>
        <div style={{ width: '64px', background: '#1a1a1a', borderRight: '1px solid rgba(255,255,255,0.1)' }} />

        <div style={{ width: '450px', background: '#111111', borderRight: '1px solid rgba(255,255,255,0.1)', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: '#9ca3af' }}>Script</div>
            <div style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', border: '2px solid #22c55e', borderRadius: '10px', minHeight: '140px', fontSize: '13px', lineHeight: 1.6 }}>
              {text.slice(0, typedLength)}
              {showCursor && <span style={{ display: 'inline-block', width: '2px', height: '16px', background: '#22c55e', marginLeft: '2px', verticalAlign: 'middle' }} />}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
              <span style={{ fontSize: '11px', color: '#9ca3af' }}>{typedLength} characters</span>
              <span style={{ fontSize: '11px', color: '#22c55e' }}>~1.5 credits</span>
            </div>
          </div>
        </div>

        <div style={{ flex: 1, background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px' }}>
          <div style={{ width: '400px', height: '711px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', background: '#2a2a2a' }}>
            <Img src={editedImageUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 5.5: Voice Selection
export const VoiceSelectionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const dropdownSlide = spring({ frame, fps, config: { damping: 100 } });

  const voices = [
    { id: 'Rachel', name: 'Rachel - Professional', gender: 'Female', accent: 'American' },
    { id: 'Sarah', name: 'Sarah - Friendly', gender: 'Female', accent: 'American', selected: true },
    { id: 'Charlie', name: 'Charlie - Casual', gender: 'Male', accent: 'American' },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000' }}>
      <div style={{ display: 'flex', height: '100%', color: 'white' }}>
        <div style={{ width: '64px', background: '#1a1a1a', borderRight: '1px solid rgba(255,255,255,0.1)' }} />

        <div style={{ width: '450px', background: '#111111', borderRight: '1px solid rgba(255,255,255,0.1)', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: '#9ca3af' }}>Voice Actor</div>
            
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', maxHeight: `${dropdownSlide * 300}px`, overflow: 'hidden', transform: `scaleY(${dropdownSlide})`, transformOrigin: 'top' }}>
              {voices.map((voice) => (
                <div key={voice.id} style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: voice.selected ? 'rgba(34, 197, 94, 0.2)' : 'transparent', borderLeft: voice.selected ? '2px solid #22c55e' : 'none' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 600 }}>{voice.name}</div>
                    <div style={{ fontSize: '11px', color: '#9ca3af' }}>{voice.gender} • {voice.accent}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ flex: 1, background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px' }}>
          <div style={{ width: '400px', height: '711px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', background: '#2a2a2a' }}>
            <Img src={editedImageUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 6: Generate Button and Progress
export const GenerateScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = interpolate(frame, [30, fps * 3], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const showProgress = frame > 30;
  const step = progress < 33 ? 1 : progress < 66 ? 2 : 3;

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000' }}>
      <div style={{ display: 'flex', height: '100%', color: 'white' }}>
        <div style={{ width: '64px', background: '#1a1a1a', borderRight: '1px solid rgba(255,255,255,0.1)' }} />

        <div style={{ width: '450px', background: '#111111', borderRight: '1px solid rgba(255,255,255,0.1)', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          {!showProgress ? (
            <button style={{ padding: '18px', background: 'linear-gradient(to right, #22c55e, #16a34a)', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 700, color: 'white', boxShadow: '0 10px 40px rgba(34, 197, 94, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              🎬 Generate Video (~1.5 credits)
            </button>
          ) : (
            <div style={{ padding: '28px', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: '16px' }}>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(to right, #22c55e, #16a34a)', borderRadius: '4px', transition: 'width 0.3s' }} />
                </div>
              </div>
              <div style={{ fontSize: '14px', color: '#9ca3af' }}>
                {step === 1 ? '🎤 Generating speech...' : step === 2 ? '🎬 Creating video...' : '✨ Finalizing...'}
              </div>
            </div>
          )}
        </div>

        <div style={{ flex: 1, background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px' }}>
          <div style={{ width: '400px', height: '711px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', background: '#2a2a2a', position: 'relative' }}>
            <Img src={editedImageUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            {showProgress && progress < 100 && (
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '64px', height: '64px', border: '6px solid rgba(255,255,255,0.2)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};