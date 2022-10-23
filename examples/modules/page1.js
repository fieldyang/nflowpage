
import { Module} from "../../dist/npageflow.js";
export class MPage1 extends Module{
    template(){
        return `
            <div>
                <p>page1</p>
                <button e-click='topage2'>topage2</button>
                <button e-click='topage3'>topage3</button>
            </div>
        `
    }
    topage2(){
        
        this.process.setParam('data',2);
        this.process.next();
    }

    topage3(){
        console.log(this.process);
        this.process.setParam('data',3);
        this.process.next();
    }
}