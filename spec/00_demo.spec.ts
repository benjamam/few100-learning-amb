describe('Writing A Basic Spec', () => {
    it('allows you to expect stuff', () => {
        expect('JOE').toBe('joe'.toUpperCase());
    });
});

// put x in front to "comment it out", i.e. xdescribe
// put f in front to "only run that test", i.e. fit
xdescribe('writing another one', () => {
    it('should behave...', () => {
        expect(35).toEqual(20 + 15);
    });
});
