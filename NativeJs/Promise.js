const PENDING='PENDING',
        FULFILLED='FULFILLED',
        REJECTED='REJECTED'
function resolvePromise(promise,x,resolve,reject){
    if(promise===x){
        return reject(new TypeError(' Chaining cycle detected for promise #<MyPromise>'))
    }
    let called=false
    if((typeof x==='object'&&x!==null)||typeof x==='function'){
        try{
            let then=x.then
            if(typeof  then==='function'){
                then.call(x,(y)=>{
                    if(called) return ;
                    called=true
                    resolvePromise(promise,y,resolve,reject)
                },(r)=>{
                    if(called) return ;
                    called=true
                    reject(r)
                })
            }else{
                resolve(x)
            }
        }catch (e) {
            if(called) return ;
            called=true
            reject(e)
        }
    }else{
        resolve(x)
    }
}
class MyPromise{
    constructor(executor) {
        this.status=PENDING
        this.value=undefined
        this.reason=undefined
        this.onFulfillCallbacks=[]
        this.onRejectedCallbacks=[]
        const  resolve=(value)=>{
            if(this.status===PENDING){
                this.status=FULFILLED
                this.value=value
                // 发布
                this.onFulfillCallbacks.forEach(fn=>fn())
            }
        }
        const reject=(reason)=>{
            if(this.status===PENDING){
                this.status=REJECTED
                this.reason=reason
                // 发布
                this.onRejectedCallbacks.forEach(fn=>fn())
            }
        }
        try{
            executor(resolve,reject)
        }catch (e) {
            reject(e)
        }
    }
    then(onFulfilled,onRejected){
        onFulfilled = typeof onFulfilled === 'function'? onFulfilled: value => value;
        onRejected = typeof onRejected === 'function'? onRejected: reason =>{ throw reason } ;
        let promise2=new MyPromise((resolve, reject) => {
            if(this.status===FULFILLED){
                setTimeout(()=>{
                    try{
                        let x=onFulfilled(this.value)
                        resolvePromise(promise2,x,resolve, reject)
                    }catch (e) {
                        reject(e)
                    }
                },0)


            }
            if(this.status===REJECTED){
                setTimeout(()=>{
                    try{
                        let x=onRejected(this.reason)
                        resolvePromise(promise2,x,resolve, reject)
                    }catch (e) {
                        reject(e)
                    }
                },0)
            }
            if(this.status===PENDING){
                // 订阅
                this.onFulfillCallbacks.push(()=>{
                    try{
                        let x=onFulfilled(this.value)
                        resolvePromise(promise2,x,resolve, reject)
                    }catch (e) {
                        reject(e)
                    }
                })
                this.onRejectedCallbacks.push(()=>{
                    try{
                        let x=onRejected(this.reason)
                        resolvePromise(promise2,x,resolve, reject)
                    }catch (e) {
                        reject(e)
                    }
                })
            }
        })
        return promise2

    }
    catch(errorBack){
        return this.then(null,errorBack)
    }
    finally(callback){
        return this.then(value=>{
            return MyPromise.resolve(callback()).then(()=>value)
        },reason=>{
            return MyPromise.reject(callback()).then(()=>{
                throw new Error('Error')
            })
        })
    }
    static resolve(value){

        if (value instanceof Promise) return value;
        if (value === null) return null;
        // 判断如果是promise
        if (typeof value === 'object' || typeof value === 'function') {
            try {
                // 判断是否有then方法
                let then = value.then;
                if (typeof then === 'function') {
                    return new MyPromise(then.call(value)); // 执行value方法
                }
            } catch (e) {
                return new MyPromise( (resolve, reject) =>{
                    reject(e);
                });
            }
        }
        return new MyPromise( (resolve, reject) =>{
            resolve(value);
        });
    }
    static reject(reason){
        return new MyPromise((resolve,reject)=>{
            reject(reason)
        })
    }
    static all(values){
        return new MyPromise((resolve,reject)=> {
            let resultArr = []
            let orderIndex = 0;
            if (!isIterable(values)) {
                    throw new TypeError(`${values} is not iterable (cannot read property Symbol(Symbol.iterator))`);
            }
            let len=values.length
            if(len===0){
                resolve([])
            }
            const processResultByKey = (value,index)=>{
                resultArr[index] = value
                orderIndex++
                if(orderIndex === len){
                    resolve(resultArr)
                }
            }
            values.forEach((value,i)=>{
                if(isPromise(value)){
                    value.then(value=>{
                        processResultByKey(value,i)
                    },reject)
                }else {
                    processResultByKey(value,i)
                }
            })
        })
    }
    static any(values){
        return new MyPromise((resolve,reject)=>{
            let count=0
            let len=values.length
            if(len===0){
                resolve([])
            }
            if (!isIterable(values)) {
                throw new TypeError(`${values} is not iterable (cannot read property Symbol(Symbol.iterator))`);
            }
            values.forEach((item,i)=>{
                if(isPromise(item)){
                    item.then((resolve,reject)=>{
                        count++
                        if(count===values.length){
                            reject(new Error('All promises were rejected'))
                        }
                    })
                }else{
                    resolve(item);
                }
                /*item.then(value=>{
                    resolve(value)
                },reason=>{
                    count++
                    if(count===values.length){
                        reject(new Error('All promises were rejected'))
                    }
                })*/
            })
        })
    }
    static race(values){
        return new MyPromise((resolve,reject)=>{
            if (!isIterable(values)) {
                throw new TypeError(`${values} is not iterable (cannot read property Symbol(Symbol.iterator))`);
            }
            values.forEach(value=>{
                if(isPromise(value)){
                    value.then(resolve,reject)
                }else{
                    resolve(value);
                }
            })
        })
    }
    static deferred(){
        const dfd={}
        dfd.promise=new MyPromise((resolve,reject)=>{
            dfd.resolve=resolve
            dfd.reject=reject
        })
        return dfd
    }
    static allSettled(values){
        return new MyPromise((resolve,reject)=>{
            const result=[]
            let count=0
            if (!isIterable(values)) {
                throw new TypeError(`${values} is not iterable (cannot read property Symbol(Symbol.iterator))`);
            }
            let len=values.length
            if(len===0){
                resolve([])
            }
            const addData=(status,value,i)=>{
                count++
                result[i]={
                    status,
                    value
                }
                if(count===len){
                    resolve(result)
                }
            }

            values.forEach((item,i)=>{
                if(isPromise(item)){
                    item.then(res=>{
                        addData('Fulfilled',res,i)
                    },reason=>{
                        addData('Rejected',reason,i)
                    })
                }else {
                    addData('Fulfilled',item,i)
                }
            })
        })
    }
}
function isPromise (x) {
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    let then = x.then;
    return typeof then === 'function';
  }
  return false;
}
function isIterable (value) {
  return value !== null && value !== undefined && typeof value[Symbol.iterator] === 'function';
}
module.exports=MyPromise
