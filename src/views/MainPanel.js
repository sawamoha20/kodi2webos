import { Header, Panel } from '@enact/moonstone/Panels';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

import Nav from '../components/Nav';
import Body from '../components/Body';

import css from './MainPanel.module.less';

const sections = ['Movies', 'TV Shows'];

//TODO: ao voltar, restabelecer a mesma seção. Está sempre voltando para Movies.


class MainPanel extends React.Component {
	static propTypes = {
		//next: PropTypes.string, NÃO RECEBE O NEXT. PODE VARIAR CONFORME A ROTA
		onClickRouteA: PropTypes.func,
		onClickRouteB: PropTypes.func,
	}

	constructor(props) {
		super(props);
		this.state = { section: sections[0] };
		console.log("construtor MainPanel");
		//console.log(this.props);
	}

	static defaultProps = {

	};

	//https://pt-br.reactjs.org/docs/faq-state.html
	//console.log(this.state); setState é assincrono! não vai refletir a mudança imediatamente!!

	handleSectionChange = ({ data: section }) => {
		console.log("MainPanel - chamou o handleSectionChange: " + section);
		this.setState({ section: section });
	}

	handleOnSelectItem = (index, type) => {
		console.log("MainPanel - chamou o handleOnSelectItem: " + index + " " + type);
		if (type === 'movies') {
			this.props.onClickRouteA(`Index: ${index} - type: ${type}`);
		} else if (type === 'tv-shows') {
			this.props.onClickRouteB(`Index: ${index} - type: ${type}`);
		}
	}

	render() {
		//clona o objeto
		const rest = Object.assign({}, this.props);

		const selectedSection = this.state.section;
		const onChange = this.handleSectionChange;
		const onSelectItem = this.handleOnSelectItem;

		console.log("MainPanel - entrou no render: " + selectedSection);
		//console.log(rest);

		return (
			<div className={css.mainView}>
				<Panel>
					<Header type="compact" title="Kodi2WebOS">
						<Nav sections={sections} onSectionChange={onChange} defaultSelected={0} />
					</Header>
					<Body section={selectedSection} onSelect={onSelectItem} />
				</Panel>
			</div>
		);
	}
}

export default MainPanel;

/**
<Scroller className={css.scroller}>
<Button onClick={onClickRouteA}>Movie 01 - onClick</Button>
<Button onClick={onClickRouteB}>TV Show 01 - onClick2</Button>
<ImageList imageitems={items} className={css.list}/>
<ImageList imageitems={tvshows} className={css.list}/>
</Scroller>
 */