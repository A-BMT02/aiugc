import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, Audio, Sequence } from 'remotion';
import { CLICK_SOUND_URL, MODAL_OPEN_SOUND_URL, SELECT_SOUND_URL } from '../sounds';

export const ActorLibraryScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const modalScale = spring({
    frame,
    fps,
    config: {
      damping: 100,
    },
  });

  const backdropOpacity = interpolate(frame, [0, 20], [0, 0.8], { extrapolateRight: 'clamp' });

  // Cursor animation - clicking 3rd actor (Alex) (60fps timing)
  const cursorStartFrame = 80;
  const cursorDuration = 180;

  const cursorProgress = interpolate(
    frame,
    [cursorStartFrame, cursorStartFrame + 70],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Position for 3rd actor (Alex) in grid - row 1, column 3
  const cursorX = interpolate(cursorProgress, [0, 1], [500, 50]);
  const cursorY = interpolate(cursorProgress, [0, 1], [-120, 0]);

  const clickFrame = cursorStartFrame + 80;
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
  
  const showCursor = frame >= cursorStartFrame && frame < cursorStartFrame + cursorDuration;

  // Update selected state based on click
  const actorSelected = frame >= clickFrame;

  const actors = [
    { id: 1, name: 'Melissa', imageUrl: 'https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/avatars/Melissa.png', selected: false },
    { id: 2, name: 'David', imageUrl: 'https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/avatars/David.png', selected: false },
    { id: 3, name: 'Alex', imageUrl: 'https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/avatars/Alex_Caucasian_Young_Male.png', selected: actorSelected },
    { id: 4, name: 'Anna', imageUrl: 'https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/avatars/Anna_Caucasian_Young_Female.png', selected: false },
    { id: 5, name: 'Darius', imageUrl: 'https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/avatars/Darius_Black_Young_Male.png', selected: false },
    { id: 6, name: 'David', imageUrl: 'https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/avatars/David_Caucasian_Young_Male.png', selected: false },
    { id: 7, name: 'Emily', imageUrl: 'https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/avatars/Emily_Asian_Old_Female.png', selected: false },
    { id: 8, name: 'Hannah', imageUrl: 'https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/avatars/Hannah_Caucasian_Young_Female.png', selected: false },
    { id: 9, name: 'Jake', imageUrl: 'https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/avatars/Jake_Caucasian_Young_Male.png', selected: false },
    { id: 10, name: 'Jasmine', imageUrl: 'https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/avatars/Jasmine_Black_Young_Female.png', selected: false },
    { id: 11, name: 'Jessica', imageUrl: 'https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/avatars/Jessica_Asian_Young_Female.png', selected: false },
    { id: 12, name: 'John', imageUrl: 'https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/avatars/John_Black_Old_Male.png', selected: false },
  ];

  return (
    <AbsoluteFill style={{ fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
      {/* Modal open sound */}
      <Sequence from={0}>
        <Audio src={MODAL_OPEN_SOUND_URL} volume={0.4} />
      </Sequence>

      {/* Click sound */}
      <Sequence from={clickFrame}>
        <Audio src={CLICK_SOUND_URL} volume={0.5} />
      </Sequence>

      {/* Selection sound - plays after click */}
      <Sequence from={clickFrame + 5}>
        <Audio src={SELECT_SOUND_URL} volume={0.4} />
      </Sequence>

      {/* Backdrop */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(8px)',
          opacity: backdropOpacity,
        }}
      />

      {/* Feature Callout */}
      <div
        style={{
          position: 'absolute',
          top: '40px',
          left: '50%',
          transform: `translateX(-50%) scale(${modalScale})`,
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
        <span style={{ fontSize: '24px' }}>👥</span>
        <span style={{ fontSize: '20px', fontWeight: 600, color: 'white' }}>
          Multiple Realistic Actors or Upload Custom Actor
        </span>
      </div>

      {/* Modal */}
      <AbsoluteFill
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        <div
          style={{
            width: '1200px',
            maxHeight: '900px',
            background: '#1a1a1a',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.1)',
            transform: `scale(${modalScale})`,
            display: 'flex',
            flexDirection: 'column',
            color: 'white',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '28px 32px',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <h2 style={{ fontSize: '28px', fontWeight: 700 }}>Actor Library</h2>
            <div
              style={{
                width: '36px',
                height: '36px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
              }}
            >
              ✕
            </div>
          </div>

          {/* Search Bar */}
          <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <div
              style={{
                padding: '12px 16px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span style={{ fontSize: '16px', color: '#6b7280' }}>🔍</span>
              <span style={{ fontSize: '14px', color: '#6b7280' }}>Search actors...</span>
            </div>
          </div>

          {/* Filters */}
          <div
            style={{
              padding: '24px 32px',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {/* Gender Filters */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {['All Actors (31)', 'Female (21)', 'Male (10)'].map((filter, i) => (
                <div
                  key={i}
                  style={{
                    padding: '10px 20px',
                    background: i === 0 ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255,255,255,0.05)',
                    border: i === 0 ? '1px solid rgba(34, 197, 94, 0.5)' : '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: i === 0 ? '#22c55e' : '#9ca3af',
                  }}
                >
                  {filter}
                </div>
              ))}
            </div>
            
            {/* Race Filters */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {['All Races (31)', 'Caucasian (13)', 'Black (4)', 'Asian (2)'].map((filter, i) => (
                <div
                  key={i}
                  style={{
                    padding: '10px 20px',
                    background: i === 0 ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255,255,255,0.05)',
                    border: i === 0 ? '1px solid rgba(34, 197, 94, 0.5)' : '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: i === 0 ? '#22c55e' : '#9ca3af',
                  }}
                >
                  {filter}
                </div>
              ))}
            </div>
          </div>

          {/* Actor Grid */}
          <div style={{ padding: '32px', flex: 1, overflowY: 'auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
                gap: '16px',
                position: 'relative',
              }}
            >
              {actors.map((actor, index) => (
                <div
                  key={actor.id}
                  style={{
                    aspectRatio: '3/4',
                    borderRadius: '12px',
                    border: actor.selected ? '3px solid #22c55e' : '2px solid rgba(255,255,255,0.1)',
                    position: 'relative',
                    boxShadow: actor.selected ? '0 0 20px rgba(34, 197, 94, 0.5)' : 'none',
                    overflow: 'hidden',
                    background: '#2a2a2a',
                    transform: (index === 2 && isClicking) ? 'scale(0.95)' : 'scale(1)',
                    transition: 'transform 0.1s ease',
                  }}
                >
                  <Img
                    src={actor.imageUrl}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  
                  {actor.selected && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        width: '24px',
                        height: '24px',
                        background: '#22c55e',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(34, 197, 94, 0.5)',
                        zIndex: 10,
                      }}
                    >
                      <div
                        style={{
                          width: '10px',
                          height: '10px',
                          background: 'white',
                          borderRadius: '50%',
                        }}
                      />
                    </div>
                  )}
                  
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '10px',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.5), transparent)',
                      borderRadius: '0 0 12px 12px',
                    }}
                  >
                    <div style={{ fontSize: '12px', fontWeight: 600 }}>{actor.name}</div>
                  </div>

                  {/* Ripple effect on 3rd actor (Alex) */}
                  {index === 2 && frame >= clickFrame && frame < clickFrame + 40 && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '80px',
                        height: '80px',
                        transform: `translate(-50%, -50%) scale(${rippleScale * 2})`,
                        border: '3px solid #22c55e',
                        borderRadius: '50%',
                        opacity: rippleOpacity,
                        pointerEvents: 'none',
                      }}
                    />
                  )}
                </div>
              ))}

              {/* Cursor - positioned on 3rd actor (Alex) */}
              {showCursor && (
                <div
                  style={{
                    position: 'absolute',
                    top: '16.67%', // Center of first row
                    left: '33.33%', // Start of 3rd column
                    transform: `translate(calc(50% + ${cursorX}px), calc(50% + ${cursorY}px)) scale(${cursorScale * 1.8})`,
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
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              padding: '24px 32px',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: '13px', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px' }}>✨</span>
              <span>31 actors available</span>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div
                style={{
                  padding: '12px 28px',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: 600,
                }}
              >
                Cancel
              </div>
              <div
                style={{
                  padding: '12px 28px',
                  background: 'linear-gradient(to right, #22c55e, #16a34a)',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: 600,
                  boxShadow: '0 4px 20px rgba(34, 197, 94, 0.3)',
                }}
              >
                Select Actor
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};