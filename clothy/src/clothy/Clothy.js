import React, { Component } from 'react'
import firebase, { auth, provider } from './firebase.js';

class Clothy extends Component {
    constructor(){
        super();
        this.state = {
            
        }

        

        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)

        this.changeFormValue = this.changeFormValue.bind(this);
        this.changeFormValueCouleur = this.changeFormValueCouleur.bind(this);
        this.changeFormValuePosition = this.changeFormValuePosition.bind(this);
        this.changeFormValueImage = this.changeFormValueImage.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);

        
        
        
        this.state = {
            vetement: "",
            value: "",
            valueCouleur: "",
            valuePosition: "",
            valueImage: "",
            user: null,
        
            
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

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
                } 
            });
        };
    login(){
        auth.signInWithPopup(provider)
            .then((result) =>{
                const user = result.user
                this.setState({
                    user
                })
                console.log(this.state.user)
            })

    }

    logout(){
        auth.signOut()
            .then(() =>{
                this.setState({
                    user: null,
                })
            })
    }
    
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
        if (this.state.user === null){
            return(<button onClick={this.login}>Se connecter</button>)
        }
        else{
        return(

            <div>
                <div>
                    <img src={this.state.user.photoURL} height="50" width="50" alt="profile"/>
                    <h3> Bonjour {this.state.user.displayName} </h3>
                    
                </div>
                <button onClick={this.logout}>Se deconnecter</button>
                
                
                <div className="navbar-brand navbar-light navbar-expand-lg">
                </div>

               <form onSubmit={this.handleSubmit} className="form-inline center-block">
                 <div class="form-group">

                  <label className="form-control">
                    Nom du vetement:
                    </label>
                    <input type="text" placeholder="exemple: Jeans" className="form-control" value={this.state.value} onChange={this.changeFormValue} />
                    
                    </div>

                 <div class="form-group">
                <label className="form-control">
                    Couleur du Vetement::
                    </label>
                    <input type="text" placeholder="exemple: Bleu" className="form-control" value={this.state.valueCouleur} onChange={this.changeFormValueCouleur} />
                  </div>

                <label className="form-control">Position vetement: </label>
                <select className="form-control" id="exampleFormControlInput1" value={this.state.valuePosition} onChange={this.changeFormValuePosition}>
                    <option>Tête</option>
                    <option>Torse</option>
                    <option>Bas</option>
                    <option>Pied</option>

                </select>

                <label className="form-control">Lien vers l'image</label>
                <input type="text" placeholder="Lien ici" className="form-control" value={this.state.valueImage} onChange={this.changeFormValueImage} />
                <button className="btn btn-primary">Créer un vetement</button>
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
}


export default Clothy
