import accessibilityMessage from '../accessibility';

describe('accessibilityMessage', () => {
    it('should concatenate message and componentType', () => {
        const message = 'This is a message';
        const componentType = 'button';

        const result = accessibilityMessage(message, componentType);

        expect(result).toBe('This is a message, button');
    });
});
