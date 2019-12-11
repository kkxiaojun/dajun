# element-ui cascader级联选择器 获取选中对象Object(currentLabels、getCheckedNodes())
> 思路：获取对应的NODE节点，节点里存储了相应的数据信息

`element-ui`中的cascader级联选择器，文档中并没有提供直接获取当前选择的`Object`

<font color=red>这里特别需要注意`element-ui`的版本问题</font>

<font color=red>`2.7.0`版本之前</font>

可以用`this.$refs['cascader'].currentLabels`获取选中节点

```javascript
  <el-cascader
    ref="cascader"
    :props="cascaderProp"
    :options="selectData.followPerson"
    v-model="searchInfo.teacherArr"
    size="mini"
    filterable
    clearable
    @change="change"
  />
  change(val) { 
    let nodesObj = this.$refs['cascader'].currentLabels
  }

```

<font color=red>`2.7.0`版本之后</font>

可以用`this.$refs['cascader'].getCheckedNodes()`获取选中节点


this.$refs['cascader'].currentLabels 在2.7版本给移除了 可以通过this.$refs['件名'].getCheckedNodes() 获取到选中的节点 [code=javascript] 
```javascript
  <el-cascader
    ref="cascader"
    :props="cascaderProp"
    :options="selectData.followPerson"
    v-model="searchInfo.teacherArr"
    size="mini"
    filterable
    clearable
    @change="change"
  />
change(val) { 
  let nodesObj = this.$refs['cascader'].getCheckedNodes()
}
```