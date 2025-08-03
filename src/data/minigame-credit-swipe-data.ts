
export type ApplicantProfile = {
    id: number;
    name: string;
    avatarUrl: string;
    loanRequest: {
        title: string;
        amount: number;
    };
    creditScore: number;
    income: number;
    dti: 'Low' | 'Medium' | 'High';
    paymentHistory: 'On Time' | 'Missed Payments';
    decision: 'Approve' | 'Deny';
    rejectionReasons: string[];
    correctRejectionReason: string;
};

export const applicantDeck: ApplicantProfile[] = [
    {
        id: 1,
        name: 'Sarah Chen',
        avatarUrl: '/images/avatars/avatar-1.png',
        loanRequest: { title: 'Loan for a new laptop', amount: 1200 },
        creditScore: 780,
        income: 4000,
        dti: 'Low',
        paymentHistory: 'On Time',
        decision: 'Approve',
        rejectionReasons: [],
        correctRejectionReason: '',
    },
    {
        id: 2,
        name: 'Mike Rivera',
        avatarUrl: '/images/avatars/avatar-2.png',
        loanRequest: { title: 'Used car financing', amount: 8000 },
        creditScore: 590,
        income: 3000,
        dti: 'High',
        paymentHistory: 'On Time',
        decision: 'Deny',
        rejectionReasons: ['Credit Score is too low', 'Debt Level is too high', 'Income is too low'],
        correctRejectionReason: 'Credit Score is too low',
    },
    {
        id: 3,
        name: 'Jessica Patel',
        avatarUrl: '/images/avatars/avatar-3.png',
        loanRequest: { title: 'Emergency vet bill', amount: 500 },
        creditScore: 680,
        income: 3200,
        dti: 'Medium',
        paymentHistory: 'Missed Payments',
        decision: 'Deny',
        rejectionReasons: ['Credit Score is too low', 'Has a history of missed payments', 'Debt Level is too high'],
        correctRejectionReason: 'Has a history of missed payments',
    },
    {
        id: 4,
        name: 'David Kim',
        avatarUrl: '/images/avatars/avatar-4.png',
        loanRequest: { title: 'Starting a small business', amount: 15000 },
        creditScore: 710,
        income: 6000,
        dti: 'High',
        paymentHistory: 'On Time',
        decision: 'Deny',
        rejectionReasons: ['Credit Score is too low', 'Debt Level is too high', 'Income is too low'],
        correctRejectionReason: 'Debt Level is too high',
    },
    {
        id: 5,
        name: 'Emily Garcia',
        avatarUrl: '/images/avatars/avatar-5.png',
        loanRequest: { title: 'Funding a coding bootcamp', amount: 10000 },
        creditScore: 750,
        income: 5500,
        dti: 'Low',
        paymentHistory: 'On Time',
        decision: 'Approve',
        rejectionReasons: [],
        correctRejectionReason: '',
    },
    {
        id: 6,
        name: 'Chris Nguyen',
        avatarUrl: '/images/avatars/avatar-6.png',
        loanRequest: { title: 'Home renovation project', amount: 20000 },
        creditScore: 620,
        income: 4500,
        dti: 'Medium',
        paymentHistory: 'Missed Payments',
        decision: 'Deny',
        rejectionReasons: ['Credit Score is too low', 'Has a history of missed payments', 'Debt Level is too high'],
        correctRejectionReason: 'Has a history of missed payments',
    },
    {
        id: 7,
        name: 'Olivia Martinez',
        avatarUrl: '/images/avatars/avatar-7.png',
        loanRequest: { title: 'Consolidating credit card debt', amount: 5000 },
        creditScore: 660,
        income: 3800,
        dti: 'High',
        paymentHistory: 'On Time',
        decision: 'Deny',
        rejectionReasons: ['Credit Score is too low', 'Debt Level is too high', 'Income is too low'],
        correctRejectionReason: 'Debt Level is too high',
    },
    {
        id: 8,
        name: 'Alex Johnson',
        avatarUrl: '/images/avatars/avatar-8.png',
        loanRequest: { title: 'New furniture for apartment', amount: 2500 },
        creditScore: 810,
        income: 7000,
        dti: 'Low',
        paymentHistory: 'On Time',
        decision: 'Approve',
        rejectionReasons: [],
        correctRejectionReason: '',
    },
    {
        id: 9,
        name: 'Tyrone McCaffery',
        avatarUrl: '/images/avatars/avatar-9.png',
        loanRequest: { title: 'Loan for a Hellcat', amount: 60000 },
        creditScore: 450,
        income: 2500,
        dti: 'High',
        paymentHistory: 'Missed Payments',
        decision: 'Deny',
        rejectionReasons: ['Credit Score is too low', 'Income is too low for this loan', 'Loan amount is too high'],
        correctRejectionReason: 'Credit Score is too low',
    },
];
