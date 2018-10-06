import React from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import Colors from '../constants/Colors';
import {getUserFeed, newTweet} from '../services/TweetService'
import TweetList from '../components/TweetList';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Twitter',
    };

    state = {
        currentTweet: '',
        loading: false,
        currentPage: 0,
        tweets: [],
    };

    componentDidMount() {
        this.setState({loading: true}, this.onGetUserFeed);


    }

    onGetUserFeed = (pageNumber = 0) => {
        getUserFeed(pageNumber)
            .then(tweets => {
                this.setState(state => ({
                    tweets: pageNumber === 0 ? tweets : [...state.tweets, ...tweets],
                    loading: false,
                    currentPage: pageNumber
                }))
            })
    }

    onChangeText = (text) => {
        this.setState({currentTweet: text})
    };

    onRefresh = () => {
        this.setState({loading: true}, this.onGetUserFeed)
    };

    onGetNextPage = () => {

        const {loading, currentPage} = this.state;
        if (!loading) {
            this.onGetUserFeed(currentPage + 1)
        }
    }

    onPost = () => {

        newTweet(this.state.currentTweet)
            .then(createdTweet => {
                this.setState(state => {

                    return {
                        currentTweet: '',
                        tweets: [createdTweet, ...state.tweets]
                    }

                })
            })

    }

    render() {
        const {currentTweet, tweets, loading} = this.state;
        return (
            <View style={styles.container}>

                <Text style={{marginLeft: 'auto'}}>{currentTweet.length} / 140 </Text>
                <TextInput value={currentTweet} onChangeText={this.onChangeText} style={styles.tweetInput} multiline
                           underlineColorAndroid="transparent"/>
                <View style={styles.button}>
                    <Button onPress={this.onPost} title="Postar" color={Colors.tintColor}/>
                </View>
                <TweetList tweets={tweets} loading={loading} onRefresh={this.onRefresh}
                           getNextPage={this.onGetNextPage}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingTop: 20
    },
    tweetInput: {
        minHeight: 100,
        maxHeight: 120,
        borderColor: '#777',
        borderWidth: 1,
        borderRadius: 5,
        textAlignVertical: 'top',
        padding: 3
    },
    button: {
        marginVertical: 5
    }
});