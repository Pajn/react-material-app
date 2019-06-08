describe('inputs', () => {
  ;['Checkbox', 'Switch', 'TextField', 'Select'].map(story => {
    it(`Story "${story}" looks correct`, async () => {
      await snapshotStory('Actions', story)
    })
  })
})
