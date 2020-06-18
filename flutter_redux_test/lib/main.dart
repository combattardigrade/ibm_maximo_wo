import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:redux/redux.dart';
import 'package:flutter_redux_test/model/model.dart';
import 'package:flutter_redux_test/redux/actions.dart';
import 'package:flutter_redux_test/redux/reducers.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Create Store
    final Store<AppState> store =
        Store<AppState>(appStateReducer, initialState: AppState.initialState());

    return StoreProvider<AppState>(
        store: store,
        child: MaterialApp(
          title: 'Flutter Demo',
          theme: ThemeData.dark(),
          home: MyHomePage(),
        ));
  }
}

class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Redux Items'),
      ),
      body: StoreConnector<AppState, _ViewModel>(
        converter: (Store<AppState> store) => _ViewModel.create(store),
        builder: (BuildContext context, _ViewModel viewModel) => Column(
          children: <Widget>[],
        ),
      ),
    );
  }
}

// Connects UI with Store
// We can define we want to expose from our store to the UI
class _ViewModel {
  final List<Item> items;
  final Function(String) onAddItem;
  final Function(Item) onRemoveItem;
  final Function() onRemoveItems;

  _ViewModel({
    this.items,
    this.onAddItem,
    this.onRemoveItem,
    this.onRemoveItems,
  });

  factory _ViewModel.create(Store<AppState> store) {
    _onAddItem(String body) {
      store.dispatch(AddItemAction(body));
    }

    _onRemoveItem(Item item) {
      store.dispatch(RemoveItemAction(item));
    }

    _onRemoveItems() {
      store.dispatch(RemoveItemsAction());
    }

    return _ViewModel(
      items: store.state.items,
      onAddItem: _onAddItem,
      onRemoveItem: _onRemoveItem,
      onRemoveItems: _onRemoveItems,
    );
  }
}
