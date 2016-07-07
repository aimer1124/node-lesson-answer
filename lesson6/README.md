- 运行测试:在根目录执行`mocha`

```
➜  lesson6 git:(master) ✗ mocha


  test/main.test.js
    ✓ should equal 0 when n === 0
    ✓ should equal 1 when n === 1
    ✓ should equal 55 when n === 10
    ✓ should throw when n > 10
    ✓ should throw when n < 0
    ✓ should throw when n isnt Number


  6 passing (9ms)

```

- 运行测试覆盖率:`istanbul cover _mocha`

```
➜  lesson6 git:(master) ✗ istanbul cover _mocha


  test/main.test.js
    ✓ should equal 0 when n === 0
    ✓ should equal 1 when n === 1
    ✓ should equal 55 when n === 10
    ✓ should throw when n > 10
    ✓ should throw when n < 0
    ✓ should throw when n isnt Number


  6 passing (8ms)

=============================================================================
Writing coverage object [/Users/yjshi/Downloads/node-lesson-answer/lesson6/coverage/coverage.json]
Writing coverage reports at [/Users/yjshi/Downloads/node-lesson-answer/lesson6/coverage]
=============================================================================

=============================== Coverage summary ===============================
Statements   : 87.5% ( 14/16 )
Branches     : 91.67% ( 11/12 )
Functions    : 100% ( 1/1 )
Lines        : 87.5% ( 14/16 )
================================================================================

```

 - 运行结束后,会在当前目录中生成一个新的文件夹`coverage`生成对应的测试报告
 
 
- 直接复制README.md中的`Makefile`代码会报错,由于`Makefile`的缩进问题,可直接复制源代码中的[https://github.com/alsotang/node-lessons/blob/master/lesson6/Makefile](https://github.com/alsotang/node-lessons/blob/master/lesson6/Makefile)

```
➜  lesson6 git:(master) ✗ make test
Makefile:2: *** missing separator.  Stop.
```