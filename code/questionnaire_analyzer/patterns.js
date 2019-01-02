var DESIGN = {
    concept: true,
    concept_motivation: true,
    concept_most_important: true,
    concept_satisfaction: {
        satisfied: true,
        easiness: true,
        motivation_for_others: true,
        motivation_for_me: true,
        relevance_of_setting: true,
        already_motivated: true
    },
    design_feasibility: true,
    design_why_not_feasible: true,
    design_game_already_designed: true,
    image_tagging_known_before: true,
    design_game_affinity: {
        game_affinity: true,
        video_game_frequency: true,
        video_game_passion: true,
        board_game_frequency: true,
        board_game_passion: true
    },
    design_playtime: true,
    concept_email: {
        concept_email_first: true,
        concept_email_repeat: true
    }
};

var END_NORMAL = {
    imi_interest_enjoyment: {
        tagging_fun: true,
        tagging_interesting: true,
        tagging_entertaining: true,
        tagging_performance: true,
        tagging_competence: true,
        tagging_success: true,
        tagging_choice_self: true,
        tagging_choice_generic: true,
        tagging_choice_steering: true,
        tagging_pressure: true,
        tagging_tension: true,
        tagging_concerns: true
    },
    sus_matrix: {
        sus_frequently: true,
        sus_unnecessary_complex: true,
        sus_easiness_to_use: true,
        sus_technical_experienced: true,
        sus_functions_well_integrated: true,
        sus_too_inconsistent: true,
        sus_fast_learnable: true,
        "sus_inconvenient ": true,
        sus_safety_while_using: true,
        sus_lot_to_learn_before: true
    },
    design_game_affinity: {
        game_affinity: true,
        video_game_frequency: true,
        video_game_passion: true,
        board_game_frequency: true,
        board_game_passion: true
    },
    comments: true
};

var END_DESIGN = {
    design_implementation: {
        imp_satisfied_with_concept: true,
        imp_satisfied_opt: true,
        imp_all_aspects_implemented: true,
        imp_satisfied_general: true,
        imp_motiv_design: true,
        imp_motiv_design_process: true
    },
    imp_optical_comment: true,
    imp_aspects_comment: true,
    self_design_more_tags: true,
    change_something: true,
    changes: true,
    sus_matrix: {
        sus_frequently: true,
        sus_unnecessary_complex: true,
        sus_easiness_to_use: true,
        sus_technical_experienced: true,
        sus_functions_well_integrated: true,
        sus_too_inconsistent: true,
        sus_fast_learnable: true,
        "sus_inconvenient ": true,
        sus_safety_while_using: true,
        sus_lot_to_learn_before: true
    },
    imi_interest_enjoyment: {
        tagging_fun: true,
        tagging_interesting: true,
        tagging_entertaining: true,
        tagging_performance: true,
        tagging_competence: true,
        tagging_success: true,
        tagging_choice_self: true,
        tagging_choice_generic: true,
        tagging_choice_steering: true,
        tagging_pressure: true,
        tagging_tension: true,
        tagging_concerns: true
    },
    comments: true
};

var DEMOGRAPHICS_NORMAL = {
    age: true,
    gender: true,
    nationality: true,
    url_where_from: true,
    "url_where_from-Comment": true,
    big_five_matrix: {
        bf_reserved: true,
        bf_trust: true,
        bf_convenient: true,
        bf_relaxed_stress: true,
        bf_art_interest: true,
        bf_social: true,
        bf_criticize: true,
        bf_task_properly: true,
        bf_fast_nervous: true,
        bf_fantasy: true
    }
};

var DEMOGRAPHICS_DESIGN = {
    age: true,
    gender: true,
    nationality: true,
    url_where_from: true,
    speed_test_value: true
};

var BIG_FIVE = {
    big_five_matrix: {
        bf_reserved: true,
        bf_trust: true,
        bf_convenient: true,
        bf_relaxed_stress: true,
        bf_art_interest: true,
        bf_social: true,
        bf_criticize: true,
        bf_task_properly: true,
        bf_fast_nervous: true,
        bf_fantasy: true
    }
};

var PATTERNS = {
    design: DESIGN,
    end_normal: END_NORMAL,
    end_design: END_DESIGN,
    demographics_normal: DEMOGRAPHICS_NORMAL,
    demographics_design: DEMOGRAPHICS_DESIGN,
    big_five: BIG_FIVE
};
