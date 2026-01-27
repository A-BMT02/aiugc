import React, { useRef } from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, Audio, Sequence } from 'remotion';
import { CLICK_SOUND_URL, MODAL_OPEN_SOUND_URL, TYPE_SOUND_URL } from '../sounds';

const alexImageUrl = 'https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/avatars/Alex_Caucasian_Young_Male.png';

export const MagicEditModalScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const inputRef = useRef<HTMLDivElement>(null);

  const modalScale = spring({ frame, fps, config: { damping: 100 } });
  const backdropOpacity = interpolate(frame, [0, 20], [0, 0.8], { extrapolateRight: 'clamp' });

  // Scroll animation - scroll down to show input (60fps timing)
  const scrollOffset = interpolate(frame, [40, 100], [0, -200], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp'
  });

  // Cursor animation - move to input field (60fps timing)
  const cursorStartFrame = 110;
  const cursorProgress = interpolate(
    frame,
    [cursorStartFrame, cursorStartFrame + 60],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const cursorX = interpolate(cursorProgress, [0, 1], [400, 0]);
  const cursorY = interpolate(cursorProgress, [0, 1], [-100, 40]);

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

  const showCursor = frame >= cursorStartFrame && frame < clickFrame + 30;

  // Zoom into input after click (60fps timing)
  const zoomStartFrame = clickFrame + 20;
  const zoomScale = interpolate(
    frame,
    [zoomStartFrame, zoomStartFrame + 40],
    [1, 1.5],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const zoomProgress = interpolate(
    frame,
    [zoomStartFrame, zoomStartFrame + 40],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // STATIC calculation - use fixed pixel values instead of getBoundingClientRect
  // This ensures consistent behavior in both preview and render
  const viewportX = 1920 / 1.5; // 1280
  const viewportY = 1080 * 0.05; // 54
  
  // Approximate input position based on your layout
  // Modal is centered, input is in the bottom section after scroll
  const modalCenterX = 1920 / 2; // 960
  const inputApproxCenterX = modalCenterX; // Input is roughly centered in modal
  const inputApproxCenterY = 600; // Adjust this value to match your input's Y position
  
  const targetX = viewportX - inputApproxCenterX;
  const targetY = viewportY - inputApproxCenterY;

  const translateX = interpolate(zoomProgress, [0, 1], [0, targetX]);
  const translateY = interpolate(zoomProgress, [0, 1], [0, targetY]);
  
  // Typing animation (60fps timing)
  const promptText = "Make him hold a book";
  const typingStartFrame = zoomStartFrame + 50;
  const typedLength = Math.floor(interpolate(
    frame,
    [typingStartFrame, typingStartFrame + 120],
    [0, promptText.length],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  ));

  const showTypingCursor = Math.floor(frame / 30) % 2 === 0 && frame >= typingStartFrame;
  const inputFocused = frame >= clickFrame;

  return (
    <AbsoluteFill>
      {/* Modal open sound */}
      <Sequence from={0}>
        <Audio src={MODAL_OPEN_SOUND_URL} volume={0.4} />
      </Sequence>

      {/* Click sound */}
      <Sequence from={clickFrame}>
        <Audio src={CLICK_SOUND_URL} volume={0.5} />
      </Sequence>

      {/* Typing sounds (60fps timing) */}
      {[0, 16, 32, 48, 64, 80, 96, 112].map((offset) => (
        <Sequence key={offset} from={typingStartFrame + offset}>
          <Audio src={TYPE_SOUND_URL} volume={0.3} />
        </Sequence>
      ))}

      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', opacity: backdropOpacity }} />

      {/* Feature Callout */}
      <div
        style={{
          position: 'absolute',
          top: '40px',
          left: '50%',
          transform: `translateX(-50%) scale(${modalScale})`,
          padding: '16px 32px',
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))',
          border: '1px solid rgba(168, 85, 247, 0.4)',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 100,
        }}
      >
        <span style={{ fontSize: '24px' }}>✨</span>
        <span style={{ fontSize: '20px', fontWeight: 600, color: 'white' }}>
          Magic Edit - Change clothes, backgrounds or add your product
        </span>
      </div>

      <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px' }}>
        <div style={{ 
          width: '1100px', 
          maxHeight: '850px', 
          background: '#1a1a1a', 
          borderRadius: '20px', 
          border: '1px solid rgba(255,255,255,0.1)', 
          transform: `scale(${modalScale})`, 
          display: 'flex', 
          flexDirection: 'column', 
          color: 'white', 
          overflow: 'hidden' 
        }}>
          <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #a855f7, #ec4899)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>✨</div>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 700 }}>Magic Edit</h2>
                <p style={{ fontSize: '12px', color: '#9ca3af' }}>Cost: 0.2 credits • Balance: 100.0</p>
              </div>
            </div>
          </div>

          <div style={{ 
            padding: '32px', 
            flex: 1, 
            overflow: 'hidden',
            transform: `translate(${translateX}px, ${translateY}px) scale(${zoomScale})`,
            transformOrigin: 'top left'
          }}>
            <div style={{ 
              transform: `translateY(${scrollOffset}px)`
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px' }}>Actor Image</div>
                  <div style={{ aspectRatio: '3/4', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', position: 'relative', background: '#2a2a2a' }}>
                    <Img src={alexImageUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px' }}>Product Image <span style={{ color: '#9ca3af', fontWeight: 400, fontSize: '11px' }}>(Optional)</span></div>
                  <div style={{ aspectRatio: '3/4', borderRadius: '12px', border: '1px dashed rgba(255,255,255,0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.02)', color: '#6b7280' }}>
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>📤</div>
                    <p style={{ fontSize: '13px' }}>Upload Product</p>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '20px', position: 'relative' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px' }}>Edit Prompt *</div>
                <div 
                  ref={inputRef}
                  style={{ 
                    padding: '16px', 
                    background: 'rgba(255,255,255,0.05)', 
                    border: inputFocused ? '2px solid #a855f7' : '2px solid rgba(255,255,255,0.1)', 
                    borderRadius: '12px', 
                    minHeight: '100px', 
                    fontSize: '14px', 
                    lineHeight: 1.6,
                    position: 'relative'
                  }}
                >
                  {frame < typingStartFrame && !inputFocused && (
                    <span style={{ color: '#6b7280' }}>Describe the changes you want to make...</span>
                  )}
                  {promptText.slice(0, typedLength)}
                  {showTypingCursor && typedLength > 0 && (
                    <span style={{ 
                      display: 'inline-block', 
                      width: '2px', 
                      height: '16px', 
                      background: '#a855f7', 
                      marginLeft: '2px', 
                      verticalAlign: 'middle' 
                    }} />
                  )}
                </div>

                {/* Ripple effect on input click */}
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
                      left: '30%',
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
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};