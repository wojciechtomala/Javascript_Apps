class ElementCollection extends Array {
    ready(callback){
        const isReady = this.some(e => {
            return e.readyState != null && e.readyState != 'loading'
        })
        if(isReady) {
            callback();
        }else{
            this.on('DOMContentLoaded', callback);
        }
        return this;
    }

    on(event, callbackOrSelector, callback){
        if(typeof callbackOrSelector === 'function'){
            this.forEach(e => e.addEventListener(event, callbackOrSelector));
        }else{
            this.forEach(element => {
                element.addEventListener(event, e => {
                    if(e.target.matches(callbackOrSelector)) callback(e);
                })
            })
        }
        return this;
    }

    next(){
        return this.map(e => e.nextElementSibling).filter(e => e != null);
        return this;
    }

    prev(){
        return this.map(e => e.previousElementSibling).filter(e => e != null);
        return this;
    }

    removeClass(className){
        this.forEach(e => e.classList.remove(className));
        return this;
    }

    addClass(className){
        this.forEach(e => e.classList.add(className));
        return this;
    }

    css(property, value){
        const camelProperty = property.replace(/(-[a-z])/, g => {
            return g.replace('-', '').toUpperCase();
        });
        this.forEach(e => e.style[camelProperty] = value)
        return this;
    }
}

function $(param){
    if(typeof param === 'string' || param instanceof String){
        return new ElementCollection(...document.querySelectorAll(param))
    }else{
        return new ElementCollection(param);
    }
}
