import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig, Img, Audio, Sequence } from 'remotion';
import { DING_SOUND_URL } from '../sounds';

const editedImageUrl = 'https://tempfile.aiquickdraw.com/workers/nano/image_1769180184320_4rab64.png';

export const GenerateScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = interpolate(frame, [60, fps * 3], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const showProgress = frame > 60;
  const step = progress < 33 ? 1 : progress < 66 ? 2 : 3;

  // Progress complete ding at fps*3 (when progress reaches 100%)
  const progressCompleteFrame = fps * 3;

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
      {/* Ding sound when progress completes */}
      <Sequence from={progressCompleteFrame}>
        <Audio src={DING_SOUND_URL} volume={0.5} />
      </Sequence>

      <div style={{ display: 'flex', height: '100%', color: 'white' }}>
        {/* Collapsed Sidebar */}
        <div style={{ width: '64px', background: '#1a1a1a', borderRight: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 12px', gap: '16px' }}>
          <div style={{ width: '40px', height: '40px', background: '#22c55e', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold' }}>B</div>
          <div style={{ width: '40px', height: '40px', background: '#22c55e', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>+</div>
        </div>

        {/* Control Panel */}
        <div style={{ width: '450px', background: '#111111', borderRight: '1px solid rgba(255,255,255,0.1)', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
          {/* Header */}
          <div style={{ paddingBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>Create Video</h2>
            <p style={{ fontSize: '13px', color: '#9ca3af' }}>Generate UGC content with AI</p>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ flex: 1, padding: '10px 16px', background: 'rgba(34, 197, 94, 0.2)', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#22c55e', textAlign: 'center' }}>👥 Actor Library</div>
            <div style={{ flex: 1, padding: '10px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#6b7280', textAlign: 'center' }}>📤 Custom Avatar</div>
          </div>

          {/* Workspace Name */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: '#9ca3af' }}>Workspace Name</div>
            <div style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', fontSize: '14px' }}>Product Demo Video</div>
          </div>

          {/* Actor Selector Grid */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px' }}>Select Actor from Library</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '12px' }}>
              <div style={{ aspectRatio: '3/4', borderRadius: '8px', overflow: 'hidden', border: '2px solid #22c55e', position: 'relative', background: '#2a2a2a' }}><Img src="https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/avatars/Alex_Caucasian_Young_Male.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /><div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} /><div style={{ position: 'absolute', top: '6px', right: '6px', width: '16px', height: '16px', background: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: '6px', height: '6px', background: 'white', borderRadius: '50%' }} /></div><div style={{ position: 'absolute', bottom: '6px', left: '6px', right: '6px' }}><div style={{ fontSize: '10px', fontWeight: 600, marginBottom: '2px' }}>Alex</div><div style={{ fontSize: '9px', color: '#d1d5db' }}>Young Male</div></div></div>
              <div style={{ aspectRatio: '3/4', borderRadius: '8px', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.1)', position: 'relative', background: '#2a2a2a' }}><Img src="https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/avatars/Melissa.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /><div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} /><div style={{ position: 'absolute', bottom: '6px', left: '6px' }}><div style={{ fontSize: '10px', fontWeight: 600 }}>Melissa</div></div></div>
              <div style={{ aspectRatio: '3/4', borderRadius: '8px', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.1)', position: 'relative', background: '#2a2a2a' }}><Img src="https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/avatars/David.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /><div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} /><div style={{ position: 'absolute', bottom: '6px', left: '6px' }}><div style={{ fontSize: '10px', fontWeight: 600 }}>David</div></div></div>
              <div style={{ aspectRatio: '3/4', borderRadius: '8px', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.1)', position: 'relative', background: '#2a2a2a' }}><Img src="https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/avatars/Anna_Caucasian_Young_Female.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /><div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} /><div style={{ position: 'absolute', bottom: '6px', left: '6px' }}><div style={{ fontSize: '10px', fontWeight: 600 }}>Anna</div></div></div>
              <div style={{ aspectRatio: '3/4', borderRadius: '8px', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.1)', position: 'relative', background: '#2a2a2a' }}><Img src="https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/avatars/Emily_Asian_Old_Female.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /><div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} /><div style={{ position: 'absolute', bottom: '6px', left: '6px' }}><div style={{ fontSize: '10px', fontWeight: 600 }}>Emily</div></div></div>
              <div style={{ aspectRatio: '3/4', borderRadius: '8px', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.1)', position: 'relative', background: '#2a2a2a' }}><Img src="https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/avatars/Jake_Caucasian_Young_Male.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /><div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} /><div style={{ position: 'absolute', bottom: '6px', left: '6px' }}><div style={{ fontSize: '10px', fontWeight: 600 }}>Jake</div></div></div>
            </div>
            <div style={{ textAlign: 'center', padding: '10px', fontSize: '13px', color: '#22c55e', fontWeight: 600 }}>View All 34 Actors →</div>
          </div>

          {/* Select Avatar - Placeholder */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: '#9ca3af' }}>Select Avatar</div>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '48px', height: '64px', background: 'linear-gradient(135deg, #6b7280, #4b5563)', borderRadius: '6px' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: 600 }}>Select from Library</div>
                <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>Choose an AI avatar</div>
              </div>
              <div style={{ fontSize: '16px', color: '#9ca3af' }}>›</div>
            </div>
          </div>

          {/* Voice - Charlie Selected */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: '#9ca3af' }}>Voice</div>
            <div style={{ padding: '12px 16px', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: '10px', fontSize: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, color: 'white' }}>Charlie - Casual</div>
                <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>Male • American</div>
              </div>
              <span style={{ color: '#22c55e', fontSize: '14px' }}>✓</span>
            </div>
          </div>

          {/* Script */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: '#9ca3af' }}>Script</div>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', minHeight: '120px', fontSize: '14px', color: '#6b7280' }}>Write your script here...</div>
          </div>

          {/* Action (Optional) */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Action (Optional)</div>
            <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '12px' }}>What skills you want your actor to do</p>
            <div style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', minHeight: '80px', fontSize: '13px', color: '#6b7280' }}>Describe the gestures, expressions, or actions you want... ie 'Smiling'</div>
          </div>

          {/* Advanced Settings */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px' }}>Advanced Settings</div>
            <div><div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '8px' }}>Language</div><div style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '13px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span>English</span><span style={{ fontSize: '10px', color: '#6b7280' }}>▼</span></div></div>
          </div>

          {/* Generate Button or Progress */}
          <div style={{ marginTop: 'auto' }}>
            {!showProgress ? (
              <button style={{ width: '100%', padding: '18px', background: 'linear-gradient(to right, #22c55e, #16a34a)', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 700, color: 'white', boxShadow: '0 10px 40px rgba(34, 197, 94, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>⚡</span>
                Generate Video (~1.5 credits)
              </button>
            ) : (
              <div style={{ padding: '28px', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: '16px' }}>
                <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: '#22c55e' }}>
                  {step === 1 ? '🎤 Generating speech...' : step === 2 ? '🎬 Creating video...' : '✨ Finalizing...'}
                </div>
                <div style={{ marginBottom: '12px', fontSize: '12px', color: '#9ca3af' }}>
                  Step {step} of 3
                </div>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(to right, #22c55e, #16a34a)', borderRadius: '4px', transition: 'width 0.3s' }} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Preview */}
        <div style={{ flex: 1, background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px' }}>
          <div style={{ width: '400px', height: '711px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 60px rgba(34, 197, 94, 0.3)', overflow: 'hidden', background: '#2a2a2a', position: 'relative' }}>
            <Img src={editedImageUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            {showProgress && (
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '64px', height: '64px', border: '6px solid rgba(255,255,255,0.2)', borderTopColor: '#22c55e', borderRadius: '50%', transform: `rotate(${frame * 12}deg)` }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};