# DateInput

封装一个日期输入组件，在输入框中输入数字，自动转换成日期格式，并对结果值进行验证。

## 使用方法

```js
import DateInput from 'date-input';


 <DateInput
      @callback="onCallback"
      text-class="textClass"
      :show-icon="false"
      :value="inputDate"
    />

```

## 属性介绍

| 属性名    | 类型    | 描述                 | 默认值 |
| --------- | ------- | -------------------- | ------ |
| disabled  | Boolean | 组件禁用             | false  |
| readonly  | Boolean | 组件只读             | false  |
| textClass | String  | 输入框样式           | ''     |
| iconClass | String  | 图标样式             | ''     |
| value     | String  | 组件显示的值，默认值 | ''     |
| showIcon  | Boolean | 显示图标             | true   |

## 自定义图标

可通过`slot`方式自定义图标
