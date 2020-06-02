<a name="top"></a>
# test v0.13.0

RESTful web API Documentation Generator

 - [indent](#indent)
   - [Indent a word](#Indent-a-word)
   - [Trim multi line (spaces)](#Trim-multi-line-(spaces))
   - [Trim multi line (tabs and space)](#Trim-multi-line-(tabs-and-space))
   - [Trim multi line (tabs)](#Trim-multi-line-(tabs))
   - [Trim single line](#Trim-single-line)

___


# <a name='indent'></a> indent

## <a name='Indent-a-word'></a> Indent a word
[Back to top](#top)

<p>text.</p>

```
GET /indent/word
```

## <a name='Trim-multi-line-(spaces)'></a> Trim multi line (spaces)
[Back to top](#top)

<p>Text line 1 (Begin: 4xSpaces (3 removed)). Text line 2 (Begin: 3xSpaces (3 removed), End: 2xSpaces).</p>

```
GET /indent/trim/multi/spaces
```

## <a name='Trim-multi-line-(tabs-and-space)'></a> Trim multi line (tabs and space)
[Back to top](#top)

<p>Text line 1 (Begin: 1xTab, 2xSpaces). Text line 2 (Begin: 3xSpaces, End: 1xTab).</p>

```
GET /indent/trim/multi/tabs/and/space
```

## <a name='Trim-multi-line-(tabs)'></a> Trim multi line (tabs)
[Back to top](#top)

<p>Text line 1 (Begin: 3xTab (2 removed)). Text line 2 (Begin: 2x Tab (2 removed), End: 1xTab).</p>

```
GET /indent/trim/multi/tabs
```

## <a name='Trim-single-line'></a> Trim single line
[Back to top](#top)

<p>Text line 1 (Begin: 3xSpaces (3 removed), End: 1xSpace).</p>

```
GET /indent/trim/single
```
