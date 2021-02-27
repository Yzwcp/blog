//获取表单内用户输入的内容 获取到的是数组  并转化为对象
    function serializeArray(form){
        var obj =  {}
        var f = form.serializeArray();
        f.forEach(function(item){
           obj[item.name] = item.value;
        })
        return obj
    
    }
