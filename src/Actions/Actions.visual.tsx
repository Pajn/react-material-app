describe('Actions', () => {
  ;[
    'Auto Placement',
    'Forced Placement',
    'Auto placement with disabled actions',
    'Forced Placement with disabled actions',
  ].map(story => {
    it(`Story "${story}" looks correct`, async () => {
      await snapshotStory('Actions', story)
    })
  })
})
