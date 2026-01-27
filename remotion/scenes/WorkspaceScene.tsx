import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, Sequence } from 'remotion';
import { CLICK_SOUND_URL } from '../sounds';

export const WorkspaceScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = interpolate(frame, [0, 40], [0, 1], { extrapolateRight: 'clamp' });

  // Cursor animation - optimized for longer scene (60fps timing)
  const cursorStartFrame = 80;
  const cursorDuration = 160;

  // Cursor movement - starts off-screen right and moves to "View All 34 Actors" button
  const cursorProgress = interpolate(
    frame,
    [cursorStartFrame, cursorStartFrame + 60],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const cursorX = interpolate(cursorProgress, [0, 1], [500, 0]);
  const cursorY = interpolate(cursorProgress, [0, 1], [-80, 40]);

  // Click animation (60fps timing)
  const clickFrame = cursorStartFrame + 70;
  const isClicking = frame >= clickFrame && frame < clickFrame + 20;
  
  const clickScale = spring({
    frame: frame - clickFrame,
    fps,
    config: {
      damping: 20,
      mass: 0.5,
    },
  });
  
  const cursorScale = isClicking ? interpolate(clickScale, [0, 1], [1, 0.8]) : 1;
  
  // Ripple effect on click
  const rippleScale = spring({
    frame: frame - clickFrame,
    fps,
    config: {
      damping: 15,
    },
  });
  
  const rippleOpacity = interpolate(
    frame,
    [clickFrame, clickFrame + 40],
    [0.6, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  
  const showCursor = frame >= cursorStartFrame && frame < cursorStartFrame + cursorDuration;

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', opacity, fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
      {/* Click sound */}
      <Sequence from={clickFrame}>
        <Audio src={CLICK_SOUND_URL} volume={0.5} />
      </Sequence>

      <div style={{ display: 'flex', height: '100%', color: 'white' }}>
        {/* Collapsed Sidebar */}
        <div
          style={{
            width: '64px',
            background: '#1a1a1a',
            borderRight: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '24px 12px',
            gap: '16px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              background: '#22c55e',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: 'bold',
            }}
          >
            B
          </div>
          <div
            style={{
              width: '40px',
              height: '40px',
              background: '#22c55e',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
            }}
          >
            +
          </div>
          <div
            style={{
              width: '40px',
              height: '40px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
            }}
          >
            📋
          </div>
        </div>

        {/* Control Panel */}
        <div
          style={{
            width: '450px',
            background: '#111111',
            borderRight: '1px solid rgba(255,255,255,0.1)',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            overflowY: 'auto',
          }}
        >
          {/* Header */}
          <div style={{ paddingBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>Create Video</h2>
            <p style={{ fontSize: '13px', color: '#9ca3af' }}>Generate UGC content with AI</p>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <div
              style={{
                flex: 1,
                padding: '10px 16px',
                background: 'rgba(34, 197, 94, 0.2)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#22c55e',
                textAlign: 'center',
              }}
            >
              👥 Actor Library
            </div>
            <div
              style={{
                flex: 1,
                padding: '10px 16px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#6b7280',
                textAlign: 'center',
              }}
            >
              📤 Custom Avatar
            </div>
          </div>

          {/* Workspace Name */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: '#9ca3af' }}>
              Workspace Name
            </div>
            <div
              style={{
                padding: '12px 16px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                fontSize: '14px',
              }}
            >
              Product Demo Video
            </div>
          </div>

          {/* Actor Selector - Quick Preview Grid */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px' }}>Select Actor from Library</div>
            
            {/* 6 Actor Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '12px' }}>
              {/* Actor 1 - Alex */}
              <div
                style={{
                  aspectRatio: '3/4',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: '2px solid rgba(255,255,255,0.1)',
                  position: 'relative',
                  background: '#2a2a2a',
                }}
              >
                <img src="https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/avatars/Alex_Caucasian_Young_Male.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />
                <div style={{ position: 'absolute', bottom: '6px', left: '6px', right: '6px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 600, marginBottom: '2px' }}>Alex</div>
                  <div style={{ fontSize: '9px', color: '#d1d5db' }}>Young Male</div>
                </div>
              </div>

              {/* Actor 2 - Melissa */}
              <div
                style={{
                  aspectRatio: '3/4',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: '2px solid rgba(255,255,255,0.1)',
                  position: 'relative',
                  background: '#2a2a2a',
                }}
              >
                <img src="https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/avatars/Melissa.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />
                <div style={{ position: 'absolute', bottom: '6px', left: '6px', right: '6px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 600, marginBottom: '2px' }}>Melissa</div>
                  <div style={{ fontSize: '9px', color: '#d1d5db' }}>Female</div>
                </div>
              </div>

              {/* Actor 3 - David */}
              <div
                style={{
                  aspectRatio: '3/4',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: '2px solid rgba(255,255,255,0.1)',
                  position: 'relative',
                  background: '#2a2a2a',
                }}
              >
                <img src="https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/avatars/David.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />
                <div style={{ position: 'absolute', bottom: '6px', left: '6px', right: '6px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 600, marginBottom: '2px' }}>David</div>
                  <div style={{ fontSize: '9px', color: '#d1d5db' }}>Male</div>
                </div>
              </div>

              {/* Actor 4 - Anna */}
              <div
                style={{
                  aspectRatio: '3/4',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: '2px solid rgba(255,255,255,0.1)',
                  position: 'relative',
                  background: '#2a2a2a',
                }}
              >
                <img src="https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/avatars/Anna_Caucasian_Young_Female.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />
                <div style={{ position: 'absolute', bottom: '6px', left: '6px', right: '6px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 600, marginBottom: '2px' }}>Anna</div>
                  <div style={{ fontSize: '9px', color: '#d1d5db' }}>Young Female</div>
                </div>
              </div>

              {/* Actor 5 - Emily */}
              <div
                style={{
                  aspectRatio: '3/4',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: '2px solid rgba(255,255,255,0.1)',
                  position: 'relative',
                  background: '#2a2a2a',
                }}
              >
                <img src="https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/avatars/Emily_Asian_Old_Female.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />
                <div style={{ position: 'absolute', bottom: '6px', left: '6px', right: '6px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 600, marginBottom: '2px' }}>Emily</div>
                  <div style={{ fontSize: '9px', color: '#d1d5db' }}>Asian Female</div>
                </div>
              </div>

              {/* Actor 6 - Jake */}
              <div
                style={{
                  aspectRatio: '3/4',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: '2px solid rgba(255,255,255,0.1)',
                  position: 'relative',
                  background: '#2a2a2a',
                }}
              >
                <img src="https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/avatars/Jake_Caucasian_Young_Male.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />
                <div style={{ position: 'absolute', bottom: '6px', left: '6px', right: '6px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 600, marginBottom: '2px' }}>Jake</div>
                  <div style={{ fontSize: '9px', color: '#d1d5db' }}>Young Male</div>
                </div>
              </div>
            </div>

            {/* View All Button with Cursor */}
            <div style={{ position: 'relative' }}>
              <div 
                style={{ 
                  textAlign: 'center', 
                  padding: '10px', 
                  fontSize: '13px', 
                  color: '#22c55e', 
                  fontWeight: 600,
                  transform: isClicking ? 'scale(0.98)' : 'scale(1)',
                  transition: 'transform 0.1s ease',
                }}
              >
                View All 34 Actors →
              </div>

              {/* Click ripple effect */}
              {frame >= clickFrame && frame < clickFrame + 40 && (
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '60px',
                    height: '60px',
                    transform: `translate(-50%, -50%) scale(${rippleScale * 3})`,
                    border: '3px solid #22c55e',
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
                  {/* Cursor pointer */}
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
                  
                  {/* Click indicator */}
                  {isClicking && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        border: '3px solid #22c55e',
                        transform: 'translate(-25%, -25%)',
                        opacity: interpolate(clickScale, [0, 1], [1, 0]),
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Select Avatar - Placeholder */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: '#9ca3af' }}>
              Select Avatar
            </div>
            <div
              style={{
                padding: '16px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '64px',
                  background: 'linear-gradient(135deg, #6b7280, #4b5563)',
                  borderRadius: '6px',
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: 600 }}>Select from Library</div>
                <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>
                  Choose an AI avatar
                </div>
              </div>
              <div style={{ fontSize: '16px', color: '#9ca3af' }}>›</div>
            </div>
          </div>

          {/* Voice */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: '#9ca3af' }}>Voice</div>
            <div
              style={{
                padding: '12px 16px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                fontSize: '14px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ color: '#9ca3af' }}>Select a voice</span>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>▼</span>
            </div>
          </div>

          {/* Script */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: '#9ca3af' }}>Script</div>
            <div
              style={{
                padding: '16px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                minHeight: '120px',
                fontSize: '14px',
                color: '#6b7280',
              }}
            >
              Write your script here...
            </div>
          </div>

          {/* Action (Optional) */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Action (Optional)</div>
            <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '12px' }}>
              What skills you want your actor to do
            </p>
            <div
              style={{
                padding: '12px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                minHeight: '80px',
                fontSize: '13px',
                color: '#6b7280',
              }}
            >
              Describe the gestures, expressions, or actions you want... ie 'Smiling'
            </div>
          </div>

          {/* Advanced Settings */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px' }}>Advanced Settings</div>
            <div>
              <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '8px' }}>Language</div>
              <div
                style={{
                  padding: '10px 12px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  fontSize: '13px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>English</span>
                <span style={{ fontSize: '10px', color: '#6b7280' }}>▼</span>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <button
            style={{
              padding: '16px',
              background: 'linear-gradient(to right, #22c55e, #16a34a)',
              border: 'none',
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: 700,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 8px 24px rgba(34, 197, 94, 0.3)',
              cursor: 'pointer',
            }}
          >
            <span style={{ fontSize: '18px' }}>⚡</span>
            Generate Video
          </button>
        </div>

        {/* Preview Area */}
        <div
          style={{
            flex: 1,
            background: '#0a0a0a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '48px',
          }}
        >
          <div
            style={{
              width: '400px',
              height: '711px',
              background: 'linear-gradient(135deg, #1f2937, #111827)',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '16px',
              color: '#6b7280',
            }}
          >
            <div style={{ fontSize: '48px' }}>🎬</div>
            <div style={{ fontSize: '14px' }}>No preview available</div>
            <div style={{ fontSize: '12px', color: '#4b5563' }}>Select an avatar to get started</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};