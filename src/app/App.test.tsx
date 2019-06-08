import { App } from "./App"


describe("App Component Test", () => {
    const VoidAction = jest.fn(() => null)
    // @ts-ignore
    const wrapper = shallow(<App GetPostAction={VoidAction} posts={{}}/>)

    it("App is imported properly", () => {
        expect(App).not.toBeUndefined();
        expect(wrapper.length).toBe(1);
    })
})