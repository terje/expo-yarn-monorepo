import { luma, isDark, statusBarStyle } from '../color';

test.each`
    argument     | expected
    ${'#ffffff'} | ${255}
    ${'#000000'} | ${0}
    ${'#fff'}    | ${255}
    ${'#000'}    | ${0}
`('Returns luma value of $expected for $argument', ({ argument, expected }) => {
    const lumaValue = luma(argument);
    expect(lumaValue).toBeCloseTo(expected);
});

test.each`
    argument     | expected
    ${'#ffffff'} | ${false}
    ${'#000000'} | ${true}
    ${'#ff0000'} | ${true}
    ${'#00ff00'} | ${false}
    ${'#0000ff'} | ${true}
    ${'#000000'} | ${true}
`('Returns dark is $expected for $argument', ({ argument, expected }) => {
    const isDarkValue = isDark(argument);
    expect(isDarkValue).toBe(expected);
});

test.each`
    argument     | expected
    ${'#ffffff'} | ${'dark'}
    ${'#000000'} | ${'light'}
`(
    'Returns statusbar-style $expected for $argument',
    ({ argument, expected }) => {
        const statusBarStyleValue = statusBarStyle(argument);
        expect(statusBarStyleValue).toBe(expected);
    },
);
