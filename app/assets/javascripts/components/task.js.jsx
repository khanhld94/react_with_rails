var TodoTask = React.createClass({
    remove(key) {
        this.props.remove(key)
    },
    render() {
        var task = this.props.items.map((item)=>{
            return(
                <li key={item.id}>{item.text}
                    {item.status === 1 ?
                        (
                            <span className="icon"><i style={{color:"green"}} className="fa-lg fa fa-check-circle"></i></span>
                        )
                        :
                        (
                            <span className="icon"><i style={{color:"red"}} className="fa fa-lg fa-ban"></i></span>
                        )}
                    <button className="button btn-sm btn-danger" onClick={()=>this.props.remove(item.id)}>Delete</button>
                </li>
            )
        })
        return (
            <ul className="theList">
                {task}
            </ul>
        );
    }
});
var TaskList = React.createClass({

    getInitialState() {
        return {
            items: [],
            all: []
        }
    },
    addTask() {
        var arr = this.state.items;
        var item = {text: document.getElementById("input").value, status: 0}
        arr.push(item);
        $.ajax({
            url: "/tasks",
            dataType: 'json',
            type: 'POST',
            data: item,
            success: function(data) {
                this.setState(
                    {items: data, all: data}
                )
            }.bind(this),
            error: function(xhr) {
                var err = $.parseJSON(xhr.responseText).errors
                alert(document.getElementById("input").value + " " + err.text)
            }
        });
    },
    search(){
        let keyword = document.getElementById("search-field").value
        let arr = this.state.all.filter(x => x.text.includes(keyword))
        this.setState({
            items: arr
        })

    },
    remove(key) {
        // var arr = this.state.items.filter(x => x.id !== key);
        console.log(key)
        $.ajax({
            url: "/tasks/"+ key,
            dataType: 'json',
            type: 'DELETE',
            success: function(data) {
                console.log(data)
                this.setState(
                    {items: data, all: data}
                )
            }.bind(this),
            error: function(err) {
                console.log(err)
            }
        });
    },
    componentDidMount() {
        $.getJSON('/tasks', (response) => { this.setState({items: response, all: response})})
    },
    render: function () {
        return (
            <div className="todoListMain">
                <h1>Task</h1>
                <div>
                    <input id="search-field" className="form-control" onChange={() => this.search()} placeholder="Search here"/>
                </div>
                <input id="input" type="text"/>
                <button onClick={() => this.addTask()}>Add</button>
                <TodoTask items={this.state.items}
                          remove={this.remove}/>
            </div>
        );
    }
});