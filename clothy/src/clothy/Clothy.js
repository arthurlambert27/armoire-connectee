import React, { Component } from 'react'
import firebase, { auth, provider } from './firebase.js';

class Clothy extends Component {
    constructor(){
        super();
        

        
        //bind des fonctions pour qu'elles puissent fonctionner
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)

        this.changeFormValue = this.changeFormValue.bind(this);
        this.changeFormValueCouleur = this.changeFormValueCouleur.bind(this);
        this.changeFormValuePosition = this.changeFormValuePosition.bind(this);
        this.changeFormValueImage = this.changeFormValueImage.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);

        
        
        //State permettant d'enregistrer
        this.state = {
            vetement: "",
            value: "",
            valueCouleur: "",
            valuePosition: "",
            valueImage: "",
            user: null,
            dataLoaded: false,
            loadingUser: true
            
          };

        
        
       
        
        
    }
    //Methode permettant d'actualiser les BDD firebase en fonction de USER UID
    actualiserBase(){

        console.log(this.state.user)
        const itemsRef = firebase.database().ref(`items/${this.state.user.uid}`);
          
        itemsRef.on('value', (snapshot) => {
            
            this.setState({
            vetement: snapshot.val(),
            dataLoaded: true
        });
        console.log(this.state.vetement)

        
      });
        

        
        
        
    }


    
    
    
    
    //Methode appeller a l'actualisation de la page
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                user: user,
                loadingUser: false

                 });
                }
            else {
                this.setState({
                    loadingUser: false
                })
            }
                this.actualiserBase()
            }
            )
        };

    //methode du bouton se connecter
    login(){
        auth.signInWithPopup(provider)
            .then((result) =>{
                const user = result.user
                this.setState({
                    user: user,
                    loading: "False"
                })
                console.log(this.state.user)
            }).then(() =>{
                this.actualiserBase()
            })

    }

    //methode du bouton se déconnecter
    logout(){
        auth.signOut()
            .then(() =>{
                this.setState({
                    user: null,
                })
            })
    }
    
    //Les fonctions changes forme permette d'actualiser le valeur des inputs
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
    //Methode appeller lors de l'enregistrement d'un vetement
    handleSubmit(e){
        e.preventDefault();
        const itemsRef = firebase.database().ref(`items/${this.state.user.uid}`);
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
    
    //Methode permettant l'affichange 
    render(){

        //Connection a la bdd pour savoir si je suis connecté
        if (this.state.loadingUser)
            return(<div>Chargement user</div>)
        //Si je ne suis pas connectée
        else if (!this.state.user)
            return(<button onClick={this.login}>Se connecter</button>);
        //Si il je suis connecté mais qu'il n'y a pas de vetement, propose d'en créer un
        else if (!this.state.vetement && this.state.dataLoaded)
            return(
        
                <form onSubmit={this.handleSubmit} >
                <h3>Enregistrer un vetement</h3>
                <div class="form-group row">

                    <label className="col-sm-2 col-form-label">Nom du vetement:</label>
                    <div className="col-sm-5">
                        <input type="text" 
                            placeholder="exemple: Jeans" 
                            className="form-control" 
                            value={this.state.value} 
                            onChange={this.changeFormValue} 
                        />
                    </div>
                    
                </div>

                <div class="form-group row">
                    <label className="col-sm-2 col-form-label">Couleur du Vetement: </label>
                    <div className="col-sm-5">
                        <input type="text" 
                            placeholder="exemple: Bleu" 
                            className="form-control" 
                            value={this.state.valueCouleur} 
                            onChange={this.changeFormValueCouleur} 
                        />
                    </div>
                </div>

                <div class="form-group row">
                    <label className="col-sm-2 col-form-label">Position vetement: </label>
                    <div className="col-sm-5">
                        <select className="form-control" 
                            id="exampleFormControlInput1" 
                            value={this.state.valuePosition} 
                            onChange={this.changeFormValuePosition}>

                                <option>Tête</option>
                                <option>Torse</option>
                                <option>Bas</option>
                                <option>Pied</option>
                        </select>
                    </div>
                    
                </div>

                <div class="form-group row">
                    <label className="col-sm-2 col-form-label">Lien vers l'image</label>
                    <div className="col-sm-5">
                        <input type="text" 
                            placeholder="Lien ici" 
                            className="form-control" 
                            value={this.state.valueImage} 
                            onChange={this.changeFormValueImage} 
                        />
                    </div>
                    <button className="btn btn-primary">Créer un vetement</button>
                </div>
            </form>
)       
        //Sinon lance la page normal
        else
        return(

                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                            <span clasName="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                            <a className="navbar-brand" href="#">Hidden brand</a>
                                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                    <li className="nav-item active">
                                        <a className="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Link</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Link</a>
                                        
                                     </li>
                                </ul>
                            <div className="form-inline my-2 my-lg-0">
                                 <h3 className="mr-sm-2 h5"> Bonjour {this.state.user.displayName} </h3>
                                 
                                <img className="rounded-circle" onClick={this.logout} src={this.state.user.photoURL} height="50" width="50" alt="profile"/>
                            </div>
                        </div>
                    </nav>
                
                
                
                
                
                <h3>Enregistrer un vetement</h3>
                <form onSubmit={this.handleSubmit} >
                <div class="form-group row">

                    <label className="col-sm-2 col-form-label">Nom du vetement:</label>
                    <div className="col-sm-5">
                        <input type="text" 
                            placeholder="exemple: Jeans" 
                            className="form-control" 
                            value={this.state.value} 
                            onChange={this.changeFormValue} 
                        />
                    </div>
                    
                </div>

                <div class="form-group row">
                    <label className="col-sm-2 col-form-label">Couleur du Vetement: </label>
                    <div className="col-sm-5">
                        <input type="text" 
                            placeholder="exemple: Bleu" 
                            className="form-control" 
                            value={this.state.valueCouleur} 
                            onChange={this.changeFormValueCouleur} 
                        />
                    </div>
                </div>

                <div class="form-group row">
                    <label className="col-sm-2 col-form-label">Position vetement: </label>
                    <div className="col-sm-5">
                        <select className="form-control" 
                            id="exampleFormControlInput1" 
                            value={this.state.valuePosition} 
                            onChange={this.changeFormValuePosition}>

                                <option>Tête</option>
                                <option>Torse</option>
                                <option>Bas</option>
                                <option>Pied</option>
                        </select>
                    </div>
                    
                </div>

                <div class="form-group row">
                    <label className="col-sm-2 col-form-label">Lien vers l'image</label>
                    <div className="col-sm-5">
                        <input type="text" 
                            placeholder="Lien ici" 
                            className="form-control" 
                            value={this.state.valueImage} 
                            onChange={this.changeFormValueImage} 
                        />
                    </div>
                    <button className="btn btn-primary">Créer un vetement</button>
                </div>
            </form>

            
            
                
            <h3>Vêtement de {this.state.user.displayName} </h3>
            <div className="card-group">
                {Object.values(this.state.vetement).map(object => {
                    return(<div className="col-sm-3 r"><div key={object.name} className="card"  >  <img className="card-img-top" height="225" width="185" src={object.image} alt={object.name}/> <div className="card-body"><h5 className="card-title text-truncate">{object.name}</h5> <p className="card-text">  Couleur: {object.couleur} Position: {object.position}</p> </div> </div> </div>)
                    }
                        
                    )}
            </div>
                
            
               
            </div>

        )
        
}
}


export default Clothy
