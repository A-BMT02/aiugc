import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  Audio,
  Sequence,
  Img,
  staticFile,
} from 'remotion';
import { CLICK_SOUND_URL, TYPE_SOUND_URL } from '../sounds';

const mascotUrl = staticFile('blobbi-logo-green500-exact.png');

export const GoogleSearchScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });

  // Search bar scale animation
  const searchBarScale = spring({
    frame: frame - 20,
    fps,
    config: { damping: 100 },
  });

  // Cursor animation - move to search bar
  const cursorStartFrame = 60;
  const cursorProgress = interpolate(
    frame,
    [cursorStartFrame, cursorStartFrame + 40],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const cursorX = interpolate(cursorProgress, [0, 1], [600, -50]);
  const cursorY = interpolate(cursorProgress, [0, 1], [200, 40]);

  // Click animation
  const clickFrame = cursorStartFrame + 50;
  const isClicking = frame >= clickFrame && frame < clickFrame + 20;

  const clickScale = spring({
    frame: frame - clickFrame,
    fps,
    config: { damping: 20, mass: 0.5 },
  });

  const cursorScale = isClicking ? interpolate(clickScale, [0, 1], [1, 0.8]) : 1;

  const showCursor = frame >= cursorStartFrame && frame < clickFrame + 30;
  const inputFocused = frame >= clickFrame;

  // Typing animation
  const searchText = "blobbi.ai";
  const typingStartFrame = clickFrame + 40;
  const typingDuration = 120;

  const typedLength = Math.floor(
    interpolate(
      frame,
      [typingStartFrame, typingStartFrame + typingDuration],
      [0, searchText.length],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    )
  );

  const showTypingCursor =
    Math.floor(frame / 30) % 2 === 0 &&
    frame >= typingStartFrame &&
    typedLength < searchText.length;

  // Search button click
  const searchClickFrame = typingStartFrame + typingDuration + 40;
  const isSearchClicking = frame >= searchClickFrame && frame < searchClickFrame + 20;

  // Move cursor to search button
  const cursor2StartFrame = typingStartFrame + typingDuration + 10;
  const cursor2Progress = interpolate(
    frame,
    [cursor2StartFrame, cursor2StartFrame + 30],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const cursor2X = interpolate(cursor2Progress, [0, 1], [-50, -220]);
  const cursor2Y = interpolate(cursor2Progress, [0, 1], [-20, 150]);

  const showCursor2 = frame >= cursor2StartFrame && frame < searchClickFrame + 30;
  const cursor2Scale = isSearchClicking ? 0.8 : 1;

  // Search animation - zoom effect after clicking search
  const searchZoomStart = searchClickFrame + 20;
  const searchZoom = interpolate(
    frame,
    [searchZoomStart, searchZoomStart + 40],
    [1, 1.5],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const fadeOut = interpolate(
    frame,
    [searchZoomStart + 20, searchZoomStart + 50],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff', fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
      {/* Click sound when clicking search bar */}
      <Sequence from={clickFrame}>
        <Audio src={CLICK_SOUND_URL} volume={0.5} />
      </Sequence>

      {/* Typing sounds */}
      {[0, 15, 30, 45, 60, 75, 90, 105, 115].map((offset) => (
        <Sequence key={offset} from={typingStartFrame + offset}>
          <Audio src={TYPE_SOUND_URL} volume={0.3} />
        </Sequence>
      ))}

      {/* Click sound for search button */}
      <Sequence from={searchClickFrame}>
        <Audio src={CLICK_SOUND_URL} volume={0.5} />
      </Sequence>

      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: opacity * fadeOut,
          transform: `scale(${searchZoom})`,
        }}
      >
        {/* Google Logo */}
        <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '92px', fontWeight: 500, color: '#4285F4' }}>G</span>
          <span style={{ fontSize: '92px', fontWeight: 500, color: '#EA4335' }}>o</span>
          <span style={{ fontSize: '92px', fontWeight: 500, color: '#FBBC05' }}>o</span>
          <span style={{ fontSize: '92px', fontWeight: 500, color: '#4285F4' }}>g</span>
          <span style={{ fontSize: '92px', fontWeight: 500, color: '#34A853' }}>l</span>
          <span style={{ fontSize: '92px', fontWeight: 500, color: '#EA4335' }}>e</span>
        </div>

        {/* Search Bar */}
        <div
          style={{
            position: 'relative',
            width: '680px',
            transform: `scale(${Math.min(searchBarScale, 1)})`,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '16px 24px',
              background: '#ffffff',
              border: inputFocused ? '2px solid #4285F4' : '1px solid #dfe1e5',
              borderRadius: '24px',
              boxShadow: inputFocused
                ? '0 4px 20px rgba(66, 133, 244, 0.2)'
                : '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'box-shadow 0.2s, border 0.2s',
            }}
          >
            {/* Search Icon */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              style={{ marginRight: '16px', color: '#9aa0a6' }}
            >
              <path
                d="M21 21L16.5 16.5M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            {/* Input Text */}
            <div style={{ flex: 1, fontSize: '18px', color: '#202124', minHeight: '24px' }}>
              {searchText.slice(0, typedLength)}
              {showTypingCursor && (
                <span
                  style={{
                    display: 'inline-block',
                    width: '2px',
                    height: '20px',
                    background: '#4285F4',
                    marginLeft: '2px',
                    verticalAlign: 'middle',
                  }}
                />
              )}
              {typedLength === 0 && !inputFocused && (
                <span style={{ color: '#9aa0a6' }}>Search Google or type a URL</span>
              )}
            </div>

            {/* Microphone Icon */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              style={{ marginLeft: '16px', color: '#4285F4' }}
            >
              <path
                d="M12 14C13.66 14 15 12.66 15 11V5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V11C9 12.66 10.34 14 12 14Z"
                fill="#EA4335"
              />
              <path
                d="M17 11C17 13.76 14.76 16 12 16C9.24 16 7 13.76 7 11H5C5 14.53 7.61 17.43 11 17.92V21H13V17.92C16.39 17.43 19 14.53 19 11H17Z"
                fill="#4285F4"
              />
            </svg>
          </div>

          </div>

        {/* Search Buttons */}
        <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
          <button
            style={{
              padding: '12px 20px',
              fontSize: '14px',
              color: '#3c4043',
              background: isSearchClicking ? '#e8e8e8' : '#f8f9fa',
              border: '1px solid #f8f9fa',
              borderRadius: '4px',
              cursor: 'pointer',
              transform: isSearchClicking ? 'scale(0.98)' : 'scale(1)',
              transition: 'transform 0.1s',
            }}
          >
            Google Search
          </button>
          <button
            style={{
              padding: '12px 20px',
              fontSize: '14px',
              color: '#3c4043',
              background: '#f8f9fa',
              border: '1px solid #f8f9fa',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            I'm Feeling Lucky
          </button>
        </div>

        {/* Blobbi result hint - appears after typing */}
        {typedLength === searchText.length && (
          <div
            style={{
              position: 'absolute',
              top: '58%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '680px',
              background: '#ffffff',
              borderRadius: '0 0 24px 24px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              padding: '16px 24px',
              opacity: interpolate(
                frame,
                [typingStartFrame + typingDuration, typingStartFrame + typingDuration + 20],
                [0, 1],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              ),
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', borderRadius: '8px', background: '#f8f9fa' }}>
              <Img src={mascotUrl} style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
              <div>
                <div style={{ fontSize: '16px', color: '#202124', fontWeight: 500 }}>blobbi.ai</div>
                <div style={{ fontSize: '13px', color: '#70757a' }}>AI Video Creation Platform</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* First Cursor - clicking search bar (at top level for highest z-index) */}
      {showCursor && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(calc(-50% + ${cursorX}px), calc(-50% + ${cursorY}px)) scale(${cursorScale * 1.5})`,
            pointerEvents: 'none',
            zIndex: 9999,
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
          >
            <path
              d="M5 3L19 12L12 13L9 19L5 3Z"
              fill="#1a1a1a"
              stroke="#ffffff"
              strokeWidth="1"
            />
          </svg>
        </div>
      )}

      {/* Second Cursor - clicking search button (at top level for highest z-index) */}
      {showCursor2 && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(calc(-50% + ${cursor2X}px), calc(-50% + ${cursor2Y}px)) scale(${cursor2Scale * 1.5})`,
            pointerEvents: 'none',
            zIndex: 9999,
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
          >
            <path
              d="M5 3L19 12L12 13L9 19L5 3Z"
              fill="#1a1a1a"
              stroke="#ffffff"
              strokeWidth="1"
            />
          </svg>
        </div>
      )}
    </AbsoluteFill>
  );
};
