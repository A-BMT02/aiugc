import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, Audio, Sequence } from 'remotion';
import { CLICK_SOUND_URL } from '../sounds';

const alexImageUrl = 'https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/avatars/Alex_Caucasian_Young_Male.png';

export const SelectedAvatarScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });

  // Cursor animation - move to Magic Edit button (60fps timing)
  const cursorStartFrame = 40;
  const cursorProgress = interpolate(
    frame,
    [cursorStartFrame, cursorStartFrame + 40],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const cursorX = interpolate(cursorProgress, [0, 1], [300, 30]);
  const cursorY = interpolate(cursorProgress, [0, 1], [-80, 30]);

  // Click animation (60fps timing)
  const clickFrame = cursorStartFrame + 50;
  const isClicking = frame >= clickFrame && frame < clickFrame + 20;

  const clickScale = spring({
    frame: frame - clickFrame,
    fps,
    config: { damping: 20, mass: 0.5 },
  });

  const cursorScale = isClicking ? interpolate(clickScale, [0, 1], [1, 0.8]) : 1;

  const rippleScale = spring({
    frame: frame - clickFrame,
    fps,
    config: { damping: 15 },
  });

  const rippleOpacity = interpolate(
    frame,
    [clickFrame, clickFrame + 40],
    [0.6, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const showCursor = frame >= cursorStartFrame && frame < clickFrame + 30;

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', opacity, fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
      {/* Click sound */}
      <Sequence from={clickFrame}>
        <Audio src={CLICK_SOUND_URL} volume={0.5} />
      </Sequence>

      <div style={{ display: 'flex', height: '100%', color: 'white' }}>
        {/* Collapsed Sidebar */}
        <div style={{ width: '64px', background: '#1a1a1a', borderRight: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 12px', gap: '16px' }}>
          <div style={{ width: '40px', height: '40px', background: '#22c55e', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold' }}>B</div>
          <div style={{ width: '40px', height: '40px', background: '#22c55e', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>+</div>
          <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>📋</div>
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

          {/* Selected Avatar */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: '#9ca3af' }}>Selected Avatar</div>
            <div style={{ padding: '16px', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '48px', height: '64px', borderRadius: '6px', overflow: 'hidden', background: '#2a2a2a' }}><Img src={alexImageUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
              <div><div style={{ fontSize: '14px', fontWeight: 600 }}>Alex</div><div style={{ fontSize: '12px', color: '#22c55e', marginTop: '2px' }}>✓ Selected</div></div>
            </div>
          </div>

          {/* Magic Edit Button with Click Animation */}
          <div style={{ position: 'relative' }}>
            <button style={{
              width: '100%',
              padding: '16px 24px',
              background: 'linear-gradient(135deg, #a855f7, #ec4899)',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 600,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(168, 85, 247, 0.3)',
              transform: isClicking ? 'scale(0.98)' : 'scale(1)',
              transition: 'transform 0.1s ease',
              cursor: 'pointer',
            }}>
              <span style={{ fontSize: '20px' }}>✨</span>Magic Edit
            </button>

            {/* Click ripple effect */}
            {frame >= clickFrame && frame < clickFrame + 40 && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '80px',
                  height: '80px',
                  transform: `translate(-50%, -50%) scale(${rippleScale * 3})`,
                  border: '3px solid #a855f7',
                  borderRadius: '50%',
                  opacity: rippleOpacity,
                  pointerEvents: 'none',
                }}
              />
            )}

            {/* Cursor */}
            {showCursor && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: `translate(calc(-50% + ${cursorX}px), calc(-50% + ${cursorY}px)) scale(${cursorScale * 1.8})`,
                  pointerEvents: 'none',
                  zIndex: 1000,
                }}
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{
                    filter: 'drop-shadow(0 3px 10px rgba(0,0,0,0.35))',
                  }}
                >
                  <path
                    d="M5 3L19 12L12 13L9 19L5 3Z"
                    fill="white"
                    stroke="black"
                    strokeWidth="1"
                  />
                </svg>

                {isClicking && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      border: '3px solid #a855f7',
                      transform: 'translate(-25%, -25%)',
                      opacity: interpolate(clickScale, [0, 1], [1, 0]),
                    }}
                  />
                )}
              </div>
            )}
          </div>

          {/* Voice */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: '#9ca3af' }}>Voice</div>
            <div style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', fontSize: '14px', display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#9ca3af' }}>Select a voice</span><span style={{ fontSize: '12px', color: '#6b7280' }}>▼</span></div>
          </div>

          {/* Script */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: '#9ca3af' }}>Script</div>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', minHeight: '100px', fontSize: '14px', color: '#6b7280' }}>Write your script here...</div>
          </div>

          {/* Action */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Action (Optional)</div>
            <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '12px' }}>What skills you want your actor to do</p>
            <div style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', minHeight: '70px', fontSize: '13px', color: '#6b7280' }}>Describe gestures, expressions... ie 'Smiling'</div>
          </div>

          {/* Advanced Settings */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px' }}>Advanced Settings</div>
            <div><div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '8px' }}>Language</div><div style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '13px', display: 'flex', justifyContent: 'space-between' }}><span>English</span><span style={{ fontSize: '10px', color: '#6b7280' }}>▼</span></div></div>
          </div>
        </div>

        {/* Preview */}
        <div style={{ flex: 1, background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px' }}>
          <div style={{ width: '400px', height: '711px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 60px rgba(34, 197, 94, 0.3)', overflow: 'hidden', background: '#2a2a2a' }}><Img src={alexImageUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
        </div>
      </div>
    </AbsoluteFill>
  );
};