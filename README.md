# react-native-lightweight-inview

A React Native wrapper to check whether a component is in the view port

## Installation

```bash
npm i --save react-native-lightweight-inview # npm syntax
yarn add react-native-lightweight-inview --save # yarn syntax
```

## Example

```
import InViewPort from 'react-native-lightweight-inview'

const [isInViewPort, setIsInViewPort] = useState(false)

const checkVisible = (isVisible: boolean) => {
    setIsInViewPort(isVisible)
  }

<ScrollView>
  <InViewPort onChange={(isVisible) => checkVisible(isVisible)}>
    <View style={[styles.item, {backgroundColor: isInView ? 'yellow' : '#f9c2ff'}]}>
      <Text>I'm yellow!</Text>
    </View>
  </InViewPort>
</ScrollView>
```
