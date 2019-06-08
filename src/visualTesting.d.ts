import {Response} from 'puppeteer'
import {MatchImageSnapshotOptions} from 'jest-image-snapshot'

declare global {
  function openStory(
    moduleName: string,
    storyName: string,
  ): Promise<Response | null>

  function snapshotStory(
    moduleName: string,
    storyName: string,
    options?: MatchImageSnapshotOptions,
  ): Promise<void>
}
