import React, { Component } from 'react'
import * as firebase from 'firebase';

class Clothy extends Component {
    constructor(){
        super();
        this.state = {
            
        }

        this.changeFormValue = this.changeFormValue.bind(this);
        this.changeFormValueCouleur = this.changeFormValueCouleur.bind(this);
        this.changeFormValuePosition = this.changeFormValuePosition.bind(this);
        this.changeFormValueImage = this.changeFormValueImage.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);

        var config = {
    apiKey: "AIzaSyAF9pQwstuT4w4jzfA_NnlnGUtap4uQV4Y",
    authDomain: "amoireko-ed478.firebaseapp.com",
    databaseURL: "https://amoireko-ed478.firebaseio.com",
    projectId: "amoireko-ed478",
    storageBucket: "amoireko-ed478.appspot.com",
    messagingSenderId: "120206565215"
  };
        
        firebase.initializeApp(config);
        this.state = {
            vetement: "",
            value: "",
            valueCouleur: "",
            valuePosition: "",
            valueImage: "",
        
            
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
    changeFormValueCouleur(event){
        console.log(event.target.value)
        this.setState({
            valueCouleur: event.target.value
        })
    }
    changeFormValuePosition(event){
        console.log(event.target.value)
        this.setState({
            valuePosition: event.target.value
        })
    }
    changeFormValueImage(event){
        this.setState({
            valueImage: event.target.value
        })
    }
    
    handleSubmit(e){
        e.preventDefault();
        const itemsRef = firebase.database().ref("vetement");
        const item = {
            name: this.state.value,
            couleur: this.state.valueCouleur,
            position: this.state.valuePosition,
            image: this.state.valueImage,

        }
        itemsRef.push(item);
        this.setState({
            value: "",
            valueCouleur: "",
            valuePosition: "",
            valueImage: "",
        })
    }
    
    render(){
        return(

            <div>
                
                <div className="navbar-brand navbar-light navbar-expand-lg">
                </div>

               <form onSubmit={this.handleSubmit} className="form-inline center-block">


                  <label className="form-control">
                    Nom du vetement:
                    </label>
                    <input type="text" placeholder="exemple: Jeans" className="form-control" value={this.state.value} onChange={this.changeFormValue} />
                    <button className="btn btn-primary">Créer un vetement</button>


                <label className="form-control">
                    Couleur du Vetement::
                    </label>
                    <input type="text" placeholder="exemple: Bleu" className="form-control" value={this.state.valueCouleur} onChange={this.changeFormValueCouleur} />
                  
                <label className="form-control">Position vetement: </label>
                <select className="form-control" id="exampleFormControlInput1" value={this.state.valuePosition} onChange={this.changeFormValuePosition}>
                    <option>Tête</option>
                    <option>Torse</option>
                    <option>Bas</option>
                    <option>Pied</option>

                </select>

                <label className="form-control">Lien vers l'image</label>
                <input type="text" placeholder="Lien ici" className="form-control" value={this.state.valueImage} onChange={this.changeFormValueImage} />
            </form>
            
            <div>
                <div>
                    <h3>Ma garde robe: </h3>
                    <div className="card-group">
                    {Object.values(this.state.vetement).map(object => {
                        return(<div className="col-sm-3 r"><div key={object.name} className="card"  >  <img className="card-img-top" height="225" width="185" src={object.image} alt={object.name}/> <div className="card-body"><h5 className="card-title text-truncate">{object.name}</h5> <p className="card-text">  Couleur: {object.couleur} Position: {object.position}</p> </div> </div> </div>
                            )
                        
                        
                        }
                    
                    )}
                    </div>
                </div>
            </div>
               
            </div>

        )
    }

}


export default Clothy
