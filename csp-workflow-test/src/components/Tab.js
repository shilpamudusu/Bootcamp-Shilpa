import styled from 'styled-components';

const TabContainer = styled.div`
  display: flex;
  border-bottom: 2px solid #ccc;
`;

const TabButton = styled.button`
  padding: 10px 20px;
  cursor: pointer;
  background: none;
  border: none;
  margin-right: 10px;
  font-size: 16px;
  &:hover {
    background-color: #f0f0f0;
  }
  &:focus {
    outline: none;
  }
`;

const TabContent = styled.div`
  padding: 20px;
`;

const Tab = ({ tabs, activeTab, setActiveTab, children }) => (
  <div>
    <TabContainer>
      {tabs.map((tab, index) => (
        <TabButton key={index} onClick={() => setActiveTab(index)}>
          {tab}
        </TabButton>
      ))}
    </TabContainer>
    <TabContent>{children[activeTab]}</TabContent>
  </div>
);

export default Tab;
