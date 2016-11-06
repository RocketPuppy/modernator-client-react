import React from 'react';
import { connect } from 'react-redux';
import { changeScreen } from 'reducers/change-screens';
import { joinSession } from 'reducers/session';
import { dashboardReset } from 'reducers/dashboard';
import { NEW_SESSION, SESSION } from 'types/common';
import { DashboardSession } from 'types/prop-types';
import onInitialize from 'components/on-initialize';
import Session from './session';
import { curry } from 'ramda';

const Dashboard = ({ sessions, loading, createNewSession, joinSession }) => (
  <div>
    <button onClick={createNewSession}>Create New Session</button>
    <button onClick={joinSession}>Join Session</button>
    {loading && <p>"Loading..."</p>}
    <ul>
      {sessions.map((session) =>
        <li key={session.session.sessionId}>
          <Session {...session} joinSession={joinSession} />
        </li>
      )}
    </ul>
  </div>
);

Dashboard.propTypes = {
  sessions: React.PropTypes.arrayOf(DashboardSession).isRequired,
};

const mapStateToProps = (state) => (state.dashboard);
const mapDispatchToProps = (dispatch) => ({
  createNewSession: () => dispatch(changeScreen(NEW_SESSION)),
  joinSession: curry((sessionId, name) => dispatch(joinSession(sessionId, name))),
  initialize: () => dispatch(dashboardReset)
});

export default connect(mapStateToProps, mapDispatchToProps)(onInitialize(Dashboard, 'initialize'));