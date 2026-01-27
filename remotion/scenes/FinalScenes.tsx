import React from 'react';
import { AbsoluteFill, useCurrentFrame, spring, interpolate, useVideoConfig, Video, OffthreadVideo ,Audio, Sequence, staticFile, Img } from 'remotion';
import { SUCCESS_SOUND_URL } from '../sounds';

const mascotUrl = staticFile('blobbi-logo-green500-exact.png');

// Scene 7: Final Video - Show actual generated video
export const FinalVideoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // No animation to avoid jitter
  const scale = 1;

  const finalVideoUrl = 'https://d2p7pge43lyniu.cloudfront.net/output/cd53cd93-c309-416d-a871-db481563f2a7-u2_1f68359f-2bc5-4a2a-b6b5-40a66ed5be23.mp4';

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
      {/* Success sound - Video Complete! (60fps timing) */}
      <Sequence from={10}>
        <Audio src={SUCCESS_SOUND_URL} volume={0.5} />
      </Sequence>

      <div style={{ display: 'flex', height: '100%', color: 'white' }}>
        {/* Collapsed Sidebar */}
        <div style={{ width: '64px', background: '#1a1a1a', borderRight: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 12px', gap: '16px' }}>
          <div style={{ width: '40px', height: '40px', background: '#22c55e', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold' }}>B</div>
          <div style={{ width: '40px', height: '40px', background: '#22c55e', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>+</div>
        </div>

        {/* Control Panel */}
        <div style={{ width: '450px', background: '#111111', borderRight: '1px solid rgba(255,255,255,0.1)', padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto' }}>
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
              <div style={{ aspectRatio: '3/4', borderRadius: '8px', overflow: 'hidden', border: '2px solid #22c55e', position: 'relative', background: '#2a2a2a' }}><img src="https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/avatars/Alex_Caucasian_Young_Male.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /><div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} /><div style={{ position: 'absolute', top: '6px', right: '6px', width: '16px', height: '16px', background: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: '6px', height: '6px', background: 'white', borderRadius: '50%' }} /></div><div style={{ position: 'absolute', bottom: '6px', left: '6px', right: '6px' }}><div style={{ fontSize: '10px', fontWeight: 600, marginBottom: '2px' }}>Alex</div><div style={{ fontSize: '9px', color: '#d1d5db' }}>Young Male</div></div></div>
              <div style={{ aspectRatio: '3/4', borderRadius: '8px', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.1)', position: 'relative', background: '#2a2a2a' }}><img src="https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/avatars/Melissa.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /><div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} /><div style={{ position: 'absolute', bottom: '6px', left: '6px', right: '6px' }}><div style={{ fontSize: '10px', fontWeight: 600, marginBottom: '2px' }}>Melissa</div><div style={{ fontSize: '9px', color: '#d1d5db' }}>Female</div></div></div>
              <div style={{ aspectRatio: '3/4', borderRadius: '8px', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.1)', position: 'relative', background: '#2a2a2a' }}><img src="https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/avatars/David.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /><div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} /><div style={{ position: 'absolute', bottom: '6px', left: '6px', right: '6px' }}><div style={{ fontSize: '10px', fontWeight: 600, marginBottom: '2px' }}>David</div><div style={{ fontSize: '9px', color: '#d1d5db' }}>Male</div></div></div>
              <div style={{ aspectRatio: '3/4', borderRadius: '8px', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.1)', position: 'relative', background: '#2a2a2a' }}><img src="https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/avatars/Anna_Caucasian_Young_Female.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /><div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} /><div style={{ position: 'absolute', bottom: '6px', left: '6px', right: '6px' }}><div style={{ fontSize: '10px', fontWeight: 600, marginBottom: '2px' }}>Anna</div><div style={{ fontSize: '9px', color: '#d1d5db' }}>Young Female</div></div></div>
              <div style={{ aspectRatio: '3/4', borderRadius: '8px', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.1)', position: 'relative', background: '#2a2a2a' }}><img src="https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/avatars/Emily_Asian_Old_Female.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /><div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} /><div style={{ position: 'absolute', bottom: '6px', left: '6px', right: '6px' }}><div style={{ fontSize: '10px', fontWeight: 600, marginBottom: '2px' }}>Emily</div><div style={{ fontSize: '9px', color: '#d1d5db' }}>Asian Female</div></div></div>
              <div style={{ aspectRatio: '3/4', borderRadius: '8px', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.1)', position: 'relative', background: '#2a2a2a' }}><img src="https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/avatars/Jake_Caucasian_Young_Male.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /><div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} /><div style={{ position: 'absolute', bottom: '6px', left: '6px', right: '6px' }}><div style={{ fontSize: '10px', fontWeight: 600, marginBottom: '2px' }}>Jake</div><div style={{ fontSize: '9px', color: '#d1d5db' }}>Young Male</div></div></div>
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
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', minHeight: '90px', fontSize: '14px', color: '#6b7280' }}>I've been using this for 2 weeks and honestly? Game changer. Here's why...</div>
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

          {/* Success Message */}
          <div style={{ padding: '32px', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: '20px', textAlign: 'center', transform: `scale(${scale})` }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
            <div style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Video Complete!</div>
            <div style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '4px' }}>Generated in 45 seconds</div>
            <div style={{ fontSize: '12px', color: '#22c55e' }}>Ready to download</div>
          </div>

          {/* Download Button */}
          <button style={{ padding: '16px 32px', background: 'linear-gradient(to right, #22c55e, #16a34a)', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 600, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 8px 24px rgba(34, 197, 94, 0.3)', cursor: 'pointer' }}>
            <span style={{ fontSize: '20px' }}>⬇️</span>
            Download Video
          </button>
        </div>

        {/* Preview Area - Playing Video */}
        <div style={{ flex: 1, background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px' }}>
          <div style={{ width: '400px', height: '712px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', background: '#000000', boxShadow: '0 30px 80px rgba(34, 197, 94, 0.5)' }}>
            {/* <Video src={finalVideoUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> */}
            <OffthreadVideo
  src={finalVideoUrl}
  style={{
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  }}
/>

          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 8: Outro
export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: {
      damping: 100,
    },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
      <div style={{ textAlign: 'center', transform: `scale(${scale})`, color: 'white' }}>
        {/* Blobbi Logo with Mascot */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '24px' }}>
          <Img src={mascotUrl} style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
          <span style={{
            fontSize: '80px',
            fontWeight: 800,
            background: 'linear-gradient(to right, #22c55e, #16a34a)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.02em',
          }}>blobbi</span>
        </div>
        <div style={{ fontSize: '32px', color: '#9ca3af', marginBottom: '40px', fontWeight: 500 }}>AI Video Creation Made Simple</div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '20px 40px', background: 'linear-gradient(to right, #22c55e, #16a34a)', borderRadius: '9999px', fontSize: '24px', fontWeight: 600, boxShadow: '0 10px 40px rgba(34, 197, 94, 0.4)', marginBottom: '32px' }}>Start Creating Today →</div>

        {/* Social Proof */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '32px' }}>
          <div style={{ display: 'flex' }}>
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
  );
};