# 复杂表格 AcGrids


## 何时使用

 
## 如何使用

```js

import AcGrids from 'ac-grids';
import 'ac-grids/build/AcGrids.css';
```

## 代码演示

## API

### Grid

|参数|说明|类型|默认值|
|:---|:-----|:----|:------|
|data|数据|array|[]|
|columns|列|array|[]|
|paginationObj|分页属性|同分页组件|-|
|showPagination|是否显示分页|bool|true|
|showTooltip|是否显示tooltip|bool|false|
|showIndex|是否显示序号列|bool|false|


### EditGrid

|参数|说明|类型|默认值|
|:---|:-----|:----|:------|
|data|数据|array|[]|
|columns|列|array|[]|
|title|标题|string|-|
|onOpenChange|展开收起回调|function|-|
|onChange|数据改变的回调|function|-|
|disabled|是否可编辑|bool|-|
|onDel|删除的回调|function|-|
|defaultOpen|默认是否打开|bool|-|
|showIndex|是否显示序号列|bool|true|
|excludeKeys|粘贴时不需要粘贴的key值合集|array|[]|


### columns

参考 [table的columns API](http://bee.tinper.org/tinper-bee/bee-table#Column)

|参数|说明|类型|默认值|
|:---|:-----|:----|:------|
|type|表单类型|目前支持 `input/inputNumber/select/refer`，正在继续完善，不写则不render成表单|-|
|validate|是否校验|bool|-|
|required|是否必填|bool|-|
|message|必填校验失败错误信息|string|-|
|pattern|校验正则|RegExp|-|
|patternMessage|正则校验错误信息|string|-|
|defaultValue|新增时默认值|string|-|
|maxLength|最大长度，type=`input`时生效|string|-|
|options|type=`select` 时的下拉内容|bool|-|
|precision|小数点后保留几位小数，type=`inputNumber`生效|bool|-|



 ## 注意事项

 暂无

 ## 更新日志
