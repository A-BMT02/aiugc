import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, Sequence, staticFile, Img } from 'remotion';
import { CLICK_SOUND_URL } from '../sounds';

const mascotUrl = staticFile('blobbi-logo-green500-exact.png');

export const LandingPageScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Static scale - no animation to prevent movement before click
  const scale = 1;

  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  // Cursor animation (60fps timing - starts earlier, moves faster)
  const cursorStartFrame = 30;
  const cursorDuration = 80;

  // Cursor movement - starts off-screen right and moves to button
  const cursorProgress = interpolate(
    frame,
    [cursorStartFrame, cursorStartFrame + 40],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const cursorX = interpolate(cursorProgress, [0, 1], [1400, 0]);
  const cursorY = interpolate(cursorProgress, [0, 1], [-50, 30]);

  // Click animation
  const clickFrame = cursorStartFrame + 50;
  const isClicking = frame >= clickFrame && frame < clickFrame + 16;
  
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
    <AbsoluteFill style={{ backgroundColor: '#0a0a0a' }}>
      {/* Click sound */}
      <Sequence from={clickFrame}>
        <Audio src={CLICK_SOUND_URL} volume={0.5} />
      </Sequence>

      {/* Grid background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Glow effects */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: '-15%',
          width: '400px',
          height: '400px',
          background: 'rgba(34, 197, 94, 0.2)',
          borderRadius: '50%',
          filter: 'blur(100px)',
          opacity: opacity * 0.6,
        }}
      />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          opacity,
          transform: `scale(${scale})`,
          fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '1200px', padding: '0 60px' }}>
          {/* Blobbi Logo with Mascot */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '48px' }}>
            <Img src={mascotUrl} style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
            <span style={{
              fontSize: '56px',
              fontWeight: 800,
              background: 'linear-gradient(to right, #22c55e, #16a34a)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em',
            }}>blobbi</span>
          </div>

          <h1
            style={{
              fontSize: '120px',
              fontWeight: 900,
              lineHeight: 0.9,
              marginBottom: '40px',
              letterSpacing: '-0.05em',
            }}
          >
            AI UGC Videos
            <br />
            <span
              style={{
                background: 'linear-gradient(to right, #22c55e, #16a34a)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              for Brands
            </span>
          </h1>

          <p
            style={{
              fontSize: '36px',
              color: '#9ca3af',
              marginBottom: '60px',
              lineHeight: 1.5,
            }}
          >
            Transform your product marketing with AI avatars that showcase items naturally
          </p>

          <div style={{ position: 'relative', display: 'inline-block' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '24px 48px',
                background: 'linear-gradient(to right, #22c55e, #16a34a)',
                borderRadius: '9999px',
                fontSize: '28px',
                fontWeight: 600,
                boxShadow: '0 20px 60px rgba(34, 197, 94, 0.3)',
                transform: isClicking ? 'scale(0.98)' : 'scale(1)',
                transition: 'transform 0.1s ease',
              }}
            >
              Begin Your Journey →
            </div>
            
            {/* Click ripple effect */}
            {frame >= clickFrame && frame < clickFrame + 40 && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '100px',
                  height: '100px',
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

          {/* Social Proof */}
          <div style={{ marginTop: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '-8px' }}>
              {['#4F46E5', '#7C3AED', '#EC4899', '#F59E0B', '#10B981'].map((color, i) => (
                <div key={i} style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: color,
                  border: '2px solid #0a0a0a',
                  marginLeft: i > 0 ? '-10px' : '0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 600,
                }}>
                  {['D', 'S', 'M', 'A', 'J'][i]}
                </div>
              ))}
            </div>
            <span style={{ fontSize: '18px', color: '#9ca3af', fontWeight: 500 }}>
              Trusted by <span style={{ color: '#22c55e', fontWeight: 700 }}>1,000+</span> brands
            </span>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};