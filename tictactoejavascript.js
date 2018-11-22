/*
*I couldn't read the code, So it was quite difficult to refactor
*I nuked it from space!!!
*/

'use strict'; // Always use strict

//using an IIFE prevent global scoping of variables
(function(){

    //I am going to take the object oriented approach
    // This is the TIC TAC TOE object
    const _ticTacToe = {

        //This object is in charge of the ui
        view: {

            //holds all the dom object you want to add events to
            live: {
                submit: document.getElementById('avatar')
                
            },

            //holds dom object that have registered event that you want 
            //to unregister;
            static: {
                reset: document.getElementById('reset')
            },

            //renders the main view of the game
            render (config){

                config.evt.preventDefault();
                const tbody = document.createElement('tbody');
                this.plyr1 = document.getElementById('player1').value;
                this.plyr2 = document.getElementById('player2').value;
                if(this.plyr1 === this.plyr2) 
                    return this.displayModal('player names cannot the same');
                //rows
                ['top', 'center', 'bottom'].forEach((row) => {
                    //create table rows
                    const tr = document.createElement('tr');
                    //create 3 columns for each rows
                    for(const col of ['left', 'center', 'right']){
                        const td = document.createElement('td');
                        //attach unique id to each dom object
                        td.pstn =  row === col ? row : row + col;
                        tr.appendChild(td);
                    }
                    tbody.appendChild(tr);
                });
                document.getElementById('grid').appendChild(tbody);
                const submit = document.getElementById('submit');
                this.updatePlyr(this.plyr1);
                this.swapStatus({name: ['submit'], domObj: [submit], static: true});
                this.swapStatus({name: ['reset', 'main'], 
                    domObj: [this.static.reset , tbody]});
                submit.remove();
            },

            //update the content of the #playerTurn view
            updatePlyr (plyr){ 
                document.getElementById('playerTurn')
                .textContent = `player ${ typeof(plyr) === 'string' ? 
                plyr : plyr === 0 ? this.plyr2 : this.plyr1 }'s turn`;

            },

            //prepares a dom object to be registerd by the controller
            updateLive (config){

                for( let i = 0; i < config.name.length; i++){
                    this.live[config.name[i]] = config.domObj[i];
                }
                this.notify({live: true})
            },

            //prepares a dom object to be unregistered by the controller
            updateStatic (config){

                for( let i = 0; i < config.name.length; i++){
                    this.static[config.name[i]] = config.domObj[i];
                } 
                this.notify({static: true})
            },

            //for the convinience of changing dom 
            //objects between live and static
            swapStatus (config){
                if(config.static){
                    this.updateStatic(config);

                    for(const name of config.name){
                        delete(this.live[name]);
                    }
                }else{
                    this.updateLive(config);
                    for(const name of config.name){
                        delete(this.static[name]);
                    }
                }
            },

            //TODO: implement a better modal?
            displayModal (mssg){
                setTimeout( () => alert(mssg), 200);
            },

            //incharge of updating the ui of the #tbody(game interface)
            updateMain (config){
                if(config.evt.target.textContent !== '' || config.
                    evt.target.tagName !== 'TD')
                    return;
                this.player1 = (this.player1 || 'y');
                config.evt.target.style.backgroundColor = 
                this.player1 === 'y' ?  '#05b405' : '#cddb02';

                config.evt.target.textContent = 
                this.player1 === 'y' ? this.plyr1 : this.plyr2;
                this.player1 = this.player1 === 'y' ?  'n' : 'y';
            },

            //changes all static dom object to live and resets all
            //dependencies
            reset (config){

                const obj = Object.assign({}, this.static);
                this.live['main'].remove();
                this.live['reset'].before(obj.submit);
                this.swapStatus({name: Object.keys(this.live), domObj:
                Object.values(this.live), static: true });

                this.swapStatus({name: Object.keys(obj), domObj:
                Object.values(obj)});
                document.getElementById('player1').focus();
                document.getElementById('playerTurn').textContent = '';
                delete(this.player1);
            },

            //respsonible for communicating changes to the cntrller
            notify (config){

                if( config.submit )
                    this.render(config);

                if(config.reset)
                    this.reset();

                if(config.update)
                    this.updatePlyr();

                if(config.main)
                    this.updateMain(config);

                if(config.live || config.static)
                    _ticTacToe.cntrl.notify(config);

                if(config.modal){
                    this.displayModal(`${config.tie ? 'IT IS A TIE!!!' :  'Player '
                        + (config.winner === 0 ? 'Two' : 'One') + ' Wins'} 
                        Restart Game`);
                    setTimeout(() => this.reset(config), 200);
                }

            }
        },

        //This object is in charge of event management
        cntrl: {

            //contains all registerd events
            _liveEvt: {},

            //attaches events the submit element in the view's live
            //interface
            init (){
                const submit = (evt) => this.notify({submit: true , evt : evt});
                
                document.addEventListener('DOMContentLoaded', () =>
                    _ticTacToe.view.live.submit.addEventListener('submit', 
                        submit));
                this._liveEvt.submit = submit;
                this.notify(submit);

            },

            //add click event to every other dom obj in the veiw's live
            //interface
            addEvt (){

                for(const name in _ticTacToe.view.live) {
                    if(name === 'submit'){
                        this.init();
                        continue;
                    }
                    const evtListnr = (evt) => this.notify({evt: evt, [name]: true});

                    _ticTacToe.view.live[name].addEventListener('click', 
                        evtListnr);
                    this._liveEvt[name] = evtListnr;
                }

            },

            //removes all registered events
            rmvEvt (){
               for(const evnt in _ticTacToe.view.static){
                    if(evnt === 'submit'){
                        Object.values(this._liveEvt).forEach((val) => {
                            _ticTacToe.view.static[evnt].removeEventListener('submit', 
                        val)
                        });
                    }

                    Object.values(this._liveEvt).forEach((val) => {
                        _ticTacToe.view.static[evnt].removeEventListener('click', 
                    val)
                    });
                    delete(this._liveEvt[evnt]);
               }
            },

            //responsible for communicating any event to the 
            //other dependent objects
            notify (config){
                if(config.submit || config.reset ){
                    _ticTacToe.view.notify(config);
                    _ticTacToe.logic.notify(config)
                }
                
                if( config.main ){
                    _ticTacToe.view.notify(config);
                    _ticTacToe.logic.notify(config);
                }

                if( config.static)
                    this.rmvEvt();

                if( config.live ) 
                    this.addEvt();

                if(config.modal)
                    _ticTacToe.view.notify(config);

            }

        }, 

        //This is the game's logic it is charge of determining the 
        //winner and processing user input
        logic: {

            //stores the count of moves so wee can know
            //when to start checking for matches
            movesCount: 0,

            //keeps all the moves of both player
            moves: [],

            //check moves to find matches according to specified rules
            findMatch (num){ 
                const moves = this.moves.filter((pos, idx) => (idx + 1) % 2 === num );
                const diagnls = moves.filter((pos) => !pos.includes('center'));
                
                for(const pstn of ['top', 'bottom', 'center', 'right', 'left', ...diagnls]){

                    const rowMtch = () => moves.filter((pos) => pos.startsWith(pstn)).length === 3;
                    const colMtch = () => moves.filter((pos) => pos.endsWith(pstn)).length === 3;
                    const dgnlPair = () => ['top', 'bottom', 'left', 'right'].filter((curr) => 
                    !pstn.includes(curr)).join('');

                    if( rowMtch() || colMtch() || 
                        ( diagnls.includes(pstn) && moves.includes('center') && diagnls.includes(dgnlPair()) ) 
                        )   return this.endGame(num);

                }
                if(this.movesCount === 9 )
                        this.endGame();
            },

            endGame (num){

                num === undefined ? this.notify({modal: true, tie: true}) : 
                this.notify({modal: true, winner: num});

            },

            //handles interaction between this object and its environment
            notify (config){

                if(config.main) {
                    config.evt.preventDefault();
                    if(config.evt.target.tagName !== 'TD' || this.moves.includes(config.evt.target.pstn)) 
                        return;
                    this.moves.push(config.evt.target.pstn);
                    this.movesCount++;
                     if( this.movesCount >= 5 ) this.movesCount % 2 === 0 ? this.findMatch(0) : 
                        this.findMatch(1);
                }

                if (config.reset || config.modal){
                    this.movesCount = 0;
                    this.moves = [];
                }

                if(config.modal)
                    _ticTacToe.cntrl.notify(config);
            }
        },

        init (){
            this.cntrl.init();
        }
    }
    _ticTacToe.init();
}());