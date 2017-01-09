import React from 'react';
import { dashboardSessionShape } from 'types/prop-types';
import preventDefault from 'lib/prevent-default';
import { compose, propOr } from 'ramda';
import StatefulForm from 'components/stateful-form';

const DashboardSession = ({ session, answerer, totals, joinSession}) => (
  <div>
    <p>
      {session.name}, {session.locked}, {answerer.name}, {totals.questioners} Questioners, {totals.answeredQuestions}/{totals.questions} Questions Answered
    </p>
    <StatefulForm form={({ onSubmit, onChange, name='' }) => (
      <form onSubmit={compose(joinSession(session.sessionId), propOr(null, 'name'), preventDefault(onSubmit))}>
        <p>
          <label htmlFor='name'>Desired Name</label>
          <input value={name} type='text' placeholder='Dexter' onChange={onChange('name')} />
        </p>
        <button type='submit'>Join Session</button>
      </form>
    )} />
  </div>
);

DashboardSession.propTypes = {
  ...dashboardSessionShape,
  joinSession: React.PropTypes.func.isRequired
};

export default DashboardSession;
