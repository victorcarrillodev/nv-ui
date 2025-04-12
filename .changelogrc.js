/* eslint-disable @typescript-eslint/no-unused-vars */
// .changelogrc.js
module.exports = {
  parserOpts: {
    headerPattern: /^(\w*)(?:\((.*)\))?: (.*)$/,
    headerCorrespondence: ['type', 'scope', 'subject'],
    noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES'],
    revertPattern: /^(?:Revert|revert:)\s"?([\s\S]+?)"?\s*This reverts commit (\w*)\./i,
    revertCorrespondence: ['header', 'hash'],
    issuePrefixes: ['#'],
    referenceActions: ['closes', 'fixes', 'resolves']
  },
  writerOpts: {
    transform: (commit, context) => {
      const issues = [];

      // Excluir ciertos tipos de commits
      if (commit.type === 'chore') {
        return null;
      }

      // Mapear tipos de commits a títulos legibles
      const typeMap = {
        feat: 'Features',
        fix: 'Bug Fixes',
        perf: 'Performance Improvements',
        revert: 'Reverts',
        docs: 'Documentation',
        style: 'Styles',
        refactor: 'Code Refactoring',
        test: 'Tests',
        build: 'Build System',
        ci: 'Continuous Integration'
      };

      commit.type = typeMap[commit.type] || commit.type;

      // Procesar breaking changes
      if (commit.notes && commit.notes.length > 0) {
        commit.notes.forEach(note => {
          note.title = 'BREAKING CHANGES';
        });
      }

      return commit;
    },
    groupBy: 'type',
    commitGroupsSort: (a, b) => {
      const order = ['Features', 'Bug Fixes', 'Performance Improvements', 'Code Refactoring', 'Tests'];
      return order.indexOf(a.title) - order.indexOf(b.title);
    },
    commitsSort: ['scope', 'subject'],
    noteGroupsSort: 'title'
  }
};
