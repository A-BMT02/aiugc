import React from 'react';
import { AbsoluteFill, Sequence, Audio } from 'remotion';
import { WHOOSH_SOUND_URL, BG_MUSIC_URL } from './sounds';

// Import all scene components
import { GoogleSearchScene } from './scenes/GoogleSearchScene';
import { LandingPageScene } from './scenes/LandingPageScene';
import { WorkspaceScene } from './scenes/WorkspaceScene';
import { ActorLibraryScene } from './scenes/ActorLibraryScene';

import { SelectedAvatarScene } from './scenes/SelectedAvatarScene';
import { MagicEditModalScene } from './scenes/MagicEditModalScene';
import { VoiceSelectionScene } from './scenes/VoiceSelectionScene';
import { ScriptInputScene } from './scenes/ScriptInputScene';

import { GenerateScene } from './scenes/GenerateScene';

import { FinalVideoScene, OutroScene } from './scenes/FinalScenes';

// Main Composition
export const DemoVideo: React.FC = () => {
  // Scene transition frames for whoosh sounds (60fps)
  const transitions = [360, 480, 720, 980, 1100, 1540, 1840, 2240, 2480, 2780];

  return (
    <AbsoluteFill>
      {/* Background music - plays throughout, lower volume */}
      <Audio src={BG_MUSIC_URL} volume={0.15} />

      {/* Whoosh sounds at scene transitions */}
      {transitions.map((frame) => (
        <Sequence key={frame} from={frame}>
          <Audio src={WHOOSH_SOUND_URL} volume={0.3} />
        </Sequence>
      ))}

      <Sequence from={0} durationInFrames={360}>
        <GoogleSearchScene />
      </Sequence>

      <Sequence from={360} durationInFrames={120}>
        <LandingPageScene />
      </Sequence>

      <Sequence from={480} durationInFrames={240}>
        <WorkspaceScene />
      </Sequence>

      <Sequence from={720} durationInFrames={260}>
        <ActorLibraryScene />
      </Sequence>

      <Sequence from={980} durationInFrames={120}>
        <SelectedAvatarScene />
      </Sequence>

      <Sequence from={1100} durationInFrames={440}>
        <MagicEditModalScene />
      </Sequence>

      <Sequence from={1540} durationInFrames={300}>
        <VoiceSelectionScene />
      </Sequence>

      <Sequence from={1840} durationInFrames={400}>
        <ScriptInputScene />
      </Sequence>

      <Sequence from={2240} durationInFrames={240}>
        <GenerateScene />
      </Sequence>

      <Sequence from={2480} durationInFrames={250}>
        <FinalVideoScene />
      </Sequence>

      <Sequence from={2730} durationInFrames={180}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};