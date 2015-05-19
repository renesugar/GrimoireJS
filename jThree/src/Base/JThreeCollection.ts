import JThreeObject=require('Base/JThreeObject');
import JThreeObjectWithID = require("./JThreeObjectWithID");
import Delegates = require("../Delegates");
class JThreeCollection<T extends JThreeObjectWithID>
{
  private collection:Map<string,T>=new Map<string,T>();

  public getById(id:string):T
  {
    return this.collection.get(id);
  }

  public isContained(item:T):boolean
  {
    return this.collection.has(item.ID);
  }

  public insert(item:T):boolean
  {
    if(this.collection.has(item.ID))
    {
      return false;
    }else{
      this.collection.set(item.ID,item);
      return true;
    }
  }

  public delete(item:T):boolean
  {
    if(this.collection.has(item.ID))
    {
      this.collection.delete(item.ID);
      return true;
    }else
      return false;
  }

  public each(act:Delegates.Action3<T,string,JThreeCollection<T>>)
  {
    this.collection.forEach((a,b)=>act(a,b,this));
  }
}

export=JThreeCollection;