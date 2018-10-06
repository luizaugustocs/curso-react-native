import React from 'react';
import {FlatList, Image, RefreshControl, StyleSheet, Text, View} from 'react-native';
import Colors from '../constants/Colors';


const renderItem = ({item}) => {
    return <View style={styles.tweetContainer}>
        <View style={[styles.innerTweet, styles.contentCol]}>
            <View style={styles.tweetHeader}>
                <Text>{item.authorName}</Text>
                <Text>{`@${item.authorUserName}`}</Text>
            </View>
            <View>
                <Text style={styles.tweetContent}>{item.content}</Text>
            </View>
        </View>
        <View style={styles.photoCol}>
            <Image source={{uri: item.authorPhotoURL}} style={styles.tweetPhoto}/>
        </View>
    </View>
}

const getItemKey = (item) => item.uid;

const TweetList = (props) => {
    const {loading, onRefresh, tweets, getNextPage} = props;

    return (
        <FlatList
            data={tweets}
            renderItem={renderItem}
            keyExtractor={getItemKey}
            onEndReached={getNextPage}
            onEndReachedTreshold={0.6}
            refreshControl={
                <RefreshControl colors={[Colors.tintColor]}
                                onRefresh={onRefresh}
                                refreshing={loading}
                />
            }
        >

        </FlatList>
    );
}

const styles = StyleSheet.create({
    tweetContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ccc'
    },
    innerTweet: { display: 'flex', flexWrap: 'wrap'},
    tweetHeader: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginRight: 5
    },
    tweetContent: {
      fontSize: 16,
      fontWeight: '700'
    },
    tweetPhoto: {
        width: 100,
        height: 100
    },
    contentCol: {
        display: 'flex',
        flex: 8,
    },
    photoCol: {
        display: 'flex',
        flex: 3
    }
})


export default TweetList;