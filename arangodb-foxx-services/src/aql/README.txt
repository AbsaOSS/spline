Spline ArangoDB AQL functions are defined in JS files in the following pattern:

Example:

    a function SPLINE::FOO_BAR_BAZ that takes two arguments `x` and `y` and returns `z`

File name:

    foo_bar_baz.func.ts

File content:

    export = function (x: number, y: number): number {
        return z
    }
