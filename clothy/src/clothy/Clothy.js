import React, { Component } from 'react'
import * as firebase from 'firebase';

class Clothy extends Component {
    constructor(){
        super();
        this.state = {
            
        }

        this.changeFormValue = this.changeFormValue.bind(this);
        const config = {
            apiKey: "AIzaSyCnGZv18P30Fx24q5H0mx2LP3S5vJuH23M",
            authDomain: "clothy-a191a.firebaseapp.com",
            databaseURL: "https://clothy-a191a.firebaseio.com",
            projectId: "clothy-a191a",
            storageBucket: "clothy-a191a.appspot.com",
            messagingSenderId: "464382396170"
            
            
        };
        
        firebase.initializeApp(config);
        this.state = {
            vetement: "",
            value: ""
            
        
            
          };
        
        
       
        
        
    }
    //Methode permettant d'acctualiser vetement de firebase
    actualiserBase(){
        const itemsRef = firebase.database().ref('vetement');
          
        itemsRef.on('value', (snapshot) => {
            
            this.setState({
            vetement: snapshot.val()
        });
        console.log(this.state.vetement)

        
      });
        
    }
    
    
    //Methode appeller a l'actualisation de la page
    componentWillMount(){
        this.actualiserBase()
    };
    
    changeFormValue(event){
        console.log(event.target.value)
        this.setState({
            value: event.target.value
        })
    }
    
    
    render(){
        return(

            <div>
                
                <div className="navbar-brand navbar-light navbar-expand-lg">
                </div>
               <form className="form-inline center-block">
                  <label className="form-control">
                    Nom du vetement:
                    </label>
                    <input type="text" className="form-control" value={this.state.value} onChange={this.changeFormValue} />
                    <button className="btn btn-primary">Créer un vetement</button>
                  
                  
            </form>
            
            <div>
                <div>
                    {Object.values(this.state.vetement).map(object => {
                        return(<div key={object.name}>  {object.name} </div>
                            )
                        
                        
                        }
                    )}
                </div>
            </div>
               
            </div>

        )
    }

}


export default Clothy
