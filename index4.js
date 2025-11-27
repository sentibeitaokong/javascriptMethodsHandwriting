/*function lastString(){
    let obj=[...arguments].join().split(' ')
    return obj[obj.length-1].length
}
console.log(lastString('hello nowcoder'))*/
// class Example{
//     get hello(){
//         return 'world'
//     }
// }
// const example = new Example()
// console.log(example)
// console.log(Object.getOwnPropertyDescriptor(Object.getPrototypeOf(example), 'hello'))
//
// Object.defineProperty(example, 'hello', {
//     value: 'world'
// })
// console.log(Object.getOwnPropertyDescriptor(example, 'hello'))

/*const parent = {
    get value() {
        return '19Qingfeng';
    },
};

const handler = {
    get(target, key, receiver) {
        console.log(this === handler); // log: true
        console.log(receiver === obj); // log: true
        return target[key];
    },
};

const proxy = new Proxy(parent, handler);

const obj = {
    name: 'wang.haoyu',
};

// 设置obj继承与parent的代理对象proxy
Object.setPrototypeOf(obj, proxy);

// log: false
obj.value*/
/*
Function.prototype.Mycall = function (context) {
    context = context ? Object(context) : window;
    var fn = Symbol(); // added
    context[fn] = this; // changed
    let args = [...arguments].slice(1);
    let result = context[fn](...args);
    delete context[fn]
    return result;
}
Function.prototype.MyApply = function (context,arr) {
    context = context ? Object(context) : window;
    var fn = Symbol(); // added
    context[fn] = this; // changed
    let result
    if(!arr){
        result = context[fn]()
    }else{
        result = context[fn](...arr)
    }
    delete context[fn]
    return result;
}
Function.prototype.MyBind = function (context) {
    var self=this
    var args=[].slice.call(arguments,1)
    let fNop=function (){}
    var fBound= function (){
        var bindArgs=[].slice.call(arguments)
        self.apply(this instanceof fNop?this:context,args.concat(bindArgs))
    }
    fNop.prototype=this.prototype
    fBound.prototype=new fNop()
    return fBound
}


function newFactory(){
    var obj=new Object()
    var constructor=[].shift.call(arguments)
    obj.__proto__=constructor.prototype
    var ret=constructor.apply(obj,arguments)
    return typeof ret=='object'?ret:obj

}

var value=2;
var foo={
    value:1
}
function bar(name,age){
    this.habit='shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}


bar.prototype.friend='kevin';
var bindFoo=bar.Mycall(foo,'daisy');
var obj=new bindFoo('18')
console.log(obj.habit);
console.log(obj.friend);
*/

var obj={
    foo:'foo',
    toJSON:function () {
        return 'bar'
    }
}
console.log(JSON.stringify(obj))

