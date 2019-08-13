# 复杂表格 AcGrid


## 何时使用

 
## 如何使用

```js

import AcGrid from 'ac-grid';
import 'ac-grid/build/AcGrid.css';
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


### columns

参考 [table的columns API](http://bee.tinper.org/tinper-bee/bee-table#Column)

|参数|说明|类型|默认值|
|:---|:-----|:----|:------|
|type|表单类型|`input/inputNumber/select`，不写则不render成表单|-|
|validate|是否校验|bool|-|
|required|是否必填|bool|-|
|options|type为 select 时的下拉内容|bool|-|



 ## 注意事项

 暂无

 ## 更新日志