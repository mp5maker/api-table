import { Loading } from "./Loading"

describe("Loading Component Test", () => {
    // @ts-ignore
    const wrapper = shallow(<Loading />);

    it("Loading is imported properly", () => {
        expect(Loading).not.toBeUndefined();
    })

    it("Loading should match the snapshot", () => {
        expect(Loading).toMatchSnapshot();
    })

    it("Loading should have following classes", () => {
        expect(wrapper.find('.loading').length).toBe(1)
        expect(wrapper.find('.loading-container').length).toBe(1)
        expect(wrapper.find('.loading-circle').length).toBe(1)
    })
})