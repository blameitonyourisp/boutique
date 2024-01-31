import { Boutique } from "../../../dist/package/index.js"

const store = new Boutique({
    name: {
        first: "David",
        last: "Smith"
    },
    address: {
        street: "8 Moor Place",
        city: "Ellesmere",
        county: "Shropshire",
        country: "United Kingdom",
        postcode: "SY12 0AA"
    },
    phone: "01691 368222",
    email: "davidsmith@notgmail.com"
})

console.log(JSON.stringify(store.state))

const sampleListener = store.createRedactionListener(state => {
    const { name } = state
    return detail => {
        console.log(detail)
        console.log(name)
    }
})

store.addRedactionListener(sampleListener)
// store.removeRedactionListener(sampleListener)

const sampleRedaction = store.createRedaction((state, detail) => {
    state.name.first = "Steven"
    state.name.last = "Clarke"
    // const update = {
    //     ...state.name,
    //     first: "Clarke"
    // }
    // Object.assign(state.name, update)

    return { ...detail, lastUpdated: Date.now() }
})
sampleRedaction({ source: "KEY" })

console.log(JSON.stringify(store.state))