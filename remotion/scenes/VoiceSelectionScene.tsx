import React, { useRef } from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  Img,
  Audio,
  Sequence,
} from 'remotion';
import { CLICK_SOUND_URL, DROPDOWN_SOUND_URL, SELECT_SOUND_URL } from '../sounds';

const editedImageUrl =
  'https://tempfile.aiquickdraw.com/workers/nano/image_1769180184320_4rab64.png';

export const VoiceSelectionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const voiceDropdownRef = useRef<HTMLDivElement>(null);

  // 🔒 Freeze dropdown rect ONCE (jitter fix)
  const frozenRect = useRef<DOMRect | null>(null);
  if (!frozenRect.current && voiceDropdownRef.current) {
    frozenRect.current =
      voiceDropdownRef.current.getBoundingClientRect();
  }

  // Delay dropdown expansion until after first click (60fps timing)
  const dropdownStartFrame = 150;
  const dropdownSlide = spring({
    frame: frame - dropdownStartFrame,
    fps,
    config: { damping: 100 },
  });

  // Zoom disabled - static values
  const zoomStartFrame = 30;
  const zoomScale = 1;
  const translateX = 0;
  const translateY = 0;

  // Cursor animation - move to voice dropdown AFTER zoom (60fps timing)
  const cursorStartFrame = zoomStartFrame + 60;
  const cursorProgress = interpolate(
    frame,
    [cursorStartFrame, cursorStartFrame + 50],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const cursorX = interpolate(cursorProgress, [0, 1], [400, 0]);
  const cursorY = interpolate(cursorProgress, [0, 1], [-100, -50]);

  // First click - open dropdown
  const clickFrame = cursorStartFrame + 60;
  const isClicking = frame >= clickFrame && frame < clickFrame + 20;

  const clickScale = spring({
    frame: frame - clickFrame,
    fps,
    config: { damping: 20, mass: 0.5 },
  });

  const cursorScale = isClicking
    ? interpolate(clickScale, [0, 1], [1, 0.8])
    : 1;

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

  const showCursor =
    frame >= cursorStartFrame && frame < clickFrame + 30;

  // Second cursor - move to Charlie AFTER first click (60fps timing)
const cursor2StartFrame = clickFrame + 40;
const cursor2Progress = interpolate(
  frame,
  [cursor2StartFrame, cursor2StartFrame + 40],
  [0, 1],
  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
);

const cursor2Y = interpolate(cursor2Progress, [0, 1], [0, 120]); // Move down to Charlie (3rd item)
  // Second click - select Charlie
  const click2Frame = cursor2StartFrame + 50;
  const isClicking2 = frame >= click2Frame && frame < click2Frame + 20;

  const clickScale2 = spring({
    frame: frame - click2Frame,
    fps,
    config: { damping: 20, mass: 0.5 },
  });

  const cursor2Scale = isClicking2
    ? interpolate(clickScale2, [0, 1], [1, 0.8])
    : 1;

  const rippleScale2 = spring({
    frame: frame - click2Frame,
    fps,
    config: { damping: 15 },
  });

  const rippleOpacity2 = interpolate(
    frame,
    [click2Frame, click2Frame + 40],
    [0.6, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const showCursor2 =
    frame >= cursor2StartFrame && frame < click2Frame + 30;

  const charlieSelected = frame >= click2Frame;

  const voices = [
    { id: 'Rachel', name: 'Rachel - Professional', gender: 'Female', accent: 'American', selected: false },
    { id: 'Sarah', name: 'Sarah - Friendly', gender: 'Female', accent: 'American', selected: !charlieSelected },
    { id: 'Charlie', name: 'Charlie - Casual', gender: 'Male', accent: 'American', selected: charlieSelected },
    { id: 'Emma', name: 'Emma - Warm', gender: 'Female', accent: 'British', selected: false },
    { id: 'Marcus', name: 'Marcus - Deep', gender: 'Male', accent: 'American', selected: false },
    { id: 'Lily', name: 'Lily - Energetic', gender: 'Female', accent: 'Australian', selected: false },
    { id: 'James', name: 'James - Authoritative', gender: 'Male', accent: 'British', selected: false },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
      {/* Click sounds */}
      <Sequence from={clickFrame}>
        <Audio src={CLICK_SOUND_URL} volume={0.5} />
      </Sequence>
      <Sequence from={click2Frame}>
        <Audio src={CLICK_SOUND_URL} volume={0.5} />
      </Sequence>

      {/* Dropdown open sound */}
      <Sequence from={dropdownStartFrame}>
        <Audio src={DROPDOWN_SOUND_URL} volume={0.4} />
      </Sequence>

      {/* Selection sound when Charlie is selected */}
      <Sequence from={click2Frame + 5}>
        <Audio src={SELECT_SOUND_URL} volume={0.4} />
      </Sequence>

      {/* Feature Callout */}
      <div
        style={{
          position: 'absolute',
          top: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '16px 32px',
          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.2))',
          border: '1px solid rgba(34, 197, 94, 0.4)',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 100,
        }}
      >
        <span style={{ fontSize: '24px' }}>🎙️</span>
        <span style={{ fontSize: '20px', fontWeight: 600, color: 'white' }}>
          Choose from our natural voices
        </span>
      </div>

      <div style={{ display: 'flex', height: '100%', color: 'white' }}>
        {/* Collapsed Sidebar */}
        <div style={{ width: '64px', background: '#1a1a1a', borderRight: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 12px', gap: '16px' }}>
          <div style={{ width: '40px', height: '40px', background: '#22c55e', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold' }}>B</div>
          <div style={{ width: '40px', height: '40px', background: '#22c55e', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>+</div>
        </div>

        {/* Control Panel */}
        <div style={{ 
          width: '450px', 
          background: '#111111', 
          borderRight: '1px solid rgba(255,255,255,0.1)', 
          padding: '32px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '20px', 
          overflow: 'hidden',
          transform: `translate(${translateX}px, ${translateY}px) scale(${zoomScale})`,
          transformOrigin: 'top left',
          transition: 'transform 0.3s'
        }}>
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

          {/* Voice Actor Dropdown */}
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: '#9ca3af' }}>Voice Actor</div>
            <div 
              ref={voiceDropdownRef}
              style={{ 
                background: 'rgba(255,255,255,0.05)', 
                border: '2px solid #22c55e', 
                borderRadius: '10px', 
                maxHeight: `${dropdownSlide * 300}px`, 
                overflow: 'hidden', 
                transform: `scaleY(${dropdownSlide})`, 
                transformOrigin: 'top',
                position: 'relative'
              }}
            >
              {voices.map((voice, index) => (
                <div 
                  key={voice.id} 
                  style={{ 
                    padding: '12px 16px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    background: voice.selected ? 'rgba(34, 197, 94, 0.2)' : 'transparent', 
                    borderLeft: voice.selected ? '3px solid #22c55e' : 'none',
                    transform: (index === 2 && isClicking2) ? 'scale(0.98)' : 'scale(1)',
                    transition: 'transform 0.1s ease',
                    position: 'relative'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 600 }}>{voice.name}</div>
                    <div style={{ fontSize: '11px', color: '#9ca3af' }}>{voice.gender} • {voice.accent}</div>
                  </div>
                  {voice.selected && <div style={{ fontSize: '16px' }}>✓</div>}
                  
                  {/* Ripple effect on Charlie */}
                  {index === 2 && frame >= click2Frame && frame < click2Frame + 20 && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '60px',
                        height: '60px',
                        transform: `translate(-50%, -50%) scale(${rippleScale2 * 3})`,
                        border: '3px solid #22c55e',
                        borderRadius: '50%',
                        opacity: rippleOpacity2,
                        pointerEvents: 'none',
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* First cursor - click dropdown */}
            {showCursor && (
              <div
                style={{
                  position: 'absolute',
                  top: '20%',
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
                      border: '3px solid #22c55e',
                      transform: 'translate(-25%, -25%)',
                      opacity: interpolate(clickScale, [0, 1], [1, 0]),
                    }}
                  />
                )}
              </div>
            )}

            {/* Second cursor - select Charlie */}
            {showCursor2 && (
              <div
                style={{
                  position: 'absolute',
                  top: '20%',
                  left: '50%',
                  transform: `translate(-50%, calc(-50% + ${cursor2Y}px)) scale(${cursor2Scale * 1.8})`,
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
                
                {isClicking2 && (
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
                      opacity: interpolate(clickScale2, [0, 1], [1, 0]),
                    }}
                  />
                )}
              </div>
            )}

            {/* Ripple on first click */}
            {frame >= clickFrame && frame < clickFrame + 40 && (
              <div
                style={{
                  position: 'absolute',
                  top: '20%',
                  left: '50%',
                  width: '80px',
                  height: '80px',
                  transform: `translate(-50%, -50%) scale(${rippleScale * 3})`,
                  border: '3px solid #22c55e',
                  borderRadius: '50%',
                  opacity: rippleOpacity,
                  pointerEvents: 'none',
                }}
              />
            )}
          </div>

          {/* Script */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: '#9ca3af' }}>Script</div>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', minHeight: '90px', fontSize: '14px', color: '#6b7280' }}>I've been using this for 2 weeks and honestly? Game changer. Here's why...</div>
          </div>

          {/* Action */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Action (Optional)</div>
            <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '12px' }}>What skills you want your actor to do</p>
            <div style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', minHeight: '60px', fontSize: '13px', color: '#6b7280' }}>Describe gestures... ie 'Smiling'</div>
          </div>

          {/* Advanced Settings */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px' }}>Advanced Settings</div>
            <div><div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '8px' }}>Language</div><div style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '13px', display: 'flex', justifyContent: 'space-between' }}><span>English</span><span style={{ fontSize: '10px', color: '#6b7280' }}>▼</span></div></div>
          </div>

          {/* Generate Button */}
          <button style={{ padding: '16px', background: 'linear-gradient(to right, #22c55e, #16a34a)', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: 700, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 8px 24px rgba(34, 197, 94, 0.3)', cursor: 'pointer' }}><span style={{ fontSize: '18px' }}>⚡</span>Generate Video</button>
        </div>

        {/* Preview */}
        <div style={{ flex: 1, background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px' }}>
          <div style={{ width: '400px', height: '711px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 60px rgba(34, 197, 94, 0.3)', overflow: 'hidden', background: '#2a2a2a' }}>
            <Img src={editedImageUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};