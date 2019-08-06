class EventObserver {
    public observers: any[];
    constructor () {
      this.observers = []
    }
  
    public subscribe (fn) {
      this.observers.push(fn);
      console.log(fn);
      console.log('new sub');   
    }
  
    public unsubscribe (fn) {
      this.observers = this.observers.filter(subscriber => subscriber !== fn)
    }
  
    public broadcast (data) {
      this.observers.forEach(subscriber => subscriber(data))
    }
  }
//   if (localStorage.getItem('calik')===undefined || localStorage.getItem('calik')===null)
//   {
//       localStorage.setItem('calik', JSON.stringify(new EventObserver()));
//   }
if (window['store']===undefined){
    window['store']=new EventObserver();
}
//   export default localStorage.getItem('calik') as any as EventObserver;
export default (window['store'] as EventObserver);