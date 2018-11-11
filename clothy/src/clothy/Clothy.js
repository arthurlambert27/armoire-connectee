import React, { Component } from 'react'
import * as firebase from 'firebase';

class Clothy extends Component {
    constructor(){
        super();
        this.state = {
            
        }
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
            bonjour: "2"
        
            
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
        
        const projects = this.state.vetement.map( project =>
            <div className="Project">
                <h3>{project}</h3>
            </div>
        )
        this.setState({
            afficher: projects
        })
      });
        
    }
    
    
    //Methode appeller a l'actualisation de la page
    componentWillMount(){
        this.actualiserBase()
    };
    
    
    
    
    render(){
        return(

            <div>
                
                <div className="navbar-brand navbar-light navbar-expand-lg">
                </div>
               <form className="form-inline center-block">
                  <label className="form-control">
                    Nom du vetement:
                    </label>
                    <input type="text" className="form-control" />
                    <button className="btn btn-primary">Créer un vetement</button>
                  
                  
            </form>
            
            <div>
                <div>
                    
                </div>
            </div>
               
            </div>

        )
    }

}


export default Clothy
