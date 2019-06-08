// @ts-ignore
import { Footer } from './Footer'

describe(`Layouts::Footer Component Test`, () => {
    // @ts-ignore
    const wrapper = shallow(<Footer debug />);

    it(`Layouts::Footer is Defined`, () => {
        expect(Footer).not.toBeUndefined();
    })

    it(`Layouts::Footer should render correctly in debug mode`, () => {
        expect(wrapper).toMatchSnapshot();
    })

    it('Footer should show proper data', () => {
        const dateToday = new Date().getFullYear();

        // @ts-ignore
        expect(wrapper.find('footer div').html())
            .toEqual(`<div>© ${dateToday} All Rights Reserved, Photon Development</div>`);
    })
})