const {toMatchImageSnapshot} = require('jest-image-snapshot')

expect.extend({toMatchImageSnapshot})

global.openStory = (moduleName, storyName) =>
  page.goto(
    `http://localhost:9009/iframe.html?selectedKind=${moduleName}&selectedStory=${storyName}`,
  )

global.snapshotStory = async (moduleName, storyName, options) => {
  await openStory(moduleName, storyName)

  const image = await page.screenshot()

  expect(image).toMatchImageSnapshot(options)
}
